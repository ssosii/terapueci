<?php


namespace App\Service;

use App\Entity\User;
use App\Entity\AppointmentRule;


use Symfony\Component\HttpFoundation\RequestStack;
use App\Service\AppoitmentService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\Customer;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserService
{

    public function __construct(
        EntityManagerInterface $em,
        UserPasswordEncoderInterface $passwordEncoder,
        Security $security,
        SessionInterface $session,
        AppoitmentService $appoitmentService
    ) {
        $this->em = $em;
        $this->userRepository = $em->getRepository(User::class);
        $this->passwordEncoder = $passwordEncoder;
        $this->security = $security;
        $this->session = $session;
        $this->appoitmentService = $appoitmentService;
    }
    

    public function getUser()
    {
        return $this->security->getUser();
    }

    public function isAdmin($user)
    {
        $arrayRoles = $user->getRoles();
        if (in_array("ROLE_ADMIN", $arrayRoles)) {
            return true;
        }
        return false;
    }
    public function isPatient()
    {

        $user = $this->security->getUser();

        if(!$user){
            return false;
        }
        $arrayRoles = $user->getRoles();
        if (in_array("ROLE_PATIENT", $arrayRoles)) {
          
            return true;
        }
        return false;

    }
    public function isDoctor()
    {
  
        $user = $this->security->getUser();

        if(!$user){
            return false;
        }
        $arrayRoles = $user->getRoles();
        if (in_array("ROLE_DOCTOR", $arrayRoles)) {
          
            return true;
        }
        return false;
    }

 
 
    public function isOwner($user, $profileID)
    {
        return  $user && ($this->isAdmin($user) ||  $user->getId() === (int)$profileID) ? true : false;
    }

    public function isLogged()
    {
        if ($this->security->getUser()) {
            return true;
        }
        return false;
    }

    public function prepareSlug($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\\pL\d]+~u', '-', $text);

        // trim
        $text = trim($text, '-');

        // transliterate
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        // lowercase
        $text = strtolower($text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        if (empty($text)) {
            return 'n-a';
        }

        return $text;
    }

    public function prepareDoctorForList($doctors)
    {
        $list = [];


        foreach ($doctors as $doctor) {
            $individualPrice = $doctor->getIndividualPrice();
            $individualPriceData = null;
            if ($individualPrice) {
                // $individualPriceData = $individualPrice->getId();
                $individualPriceData = [
                    "id" => $individualPrice->getId(),
                    "valueForDoctor" => $individualPrice->getValueForDoctor(),
                    "valueForPatient" => $individualPrice->getValueForPatient(),
                ];
            }

            $crisisPrice = $doctor->getCrisisPrice();
            $crisisPriceData = null;
            if ($crisisPrice) {
                // $crisisPriceData = $crisisPrice->getId();
                $crisisPriceData = [
                    "id" => $crisisPrice->getId(),
                    "valueForDoctor" => $crisisPrice->getValueForDoctor(),
                    "valueForPatient" => $crisisPrice->getValueForPatient(),
                ];
            }


            $appointments = $this->em->getRepository(AppointmentRule::class)->fetchNotUsedMin24hAndTo3Months($doctor);
            $appointmentsList = [];
            foreach ($appointments as $appointment) {
                $date = $appointment->getStartDate()->format("Y-m-d");
                $dateToDisplay = $appointment->getStartDate()->format("d.m");
                $dayOfWeek = $appointment->getStartDate()->format("N");

                if (!isset($appointmentsList[$date])) {
                    // Jeśli data nie istnieje w tablicy, to tworzymy nową pozycję
                    $appointmentsList[$date] = [
                        "date" => $dateToDisplay,
                        "dayOfWeek" => $dayOfWeek,
                        "list" => []
                    ];
                }

                // Dodajemy termin do listy w odpowiedniej grupie daty
                $appointmentsList[$date]["list"][] = $this->appoitmentService->normalizeAppointmentEntity($appointment);
            }

            $categoriesList = [];

            foreach ($doctor->getDoctorCategories() as $category) {
                if ($category->getIsActive()) {
                    $categoriesList[$category->getMainCategory()->getName()][] = $category->getName();
                }
            }

            $languesList = [];

            foreach ($doctor->getLangues() as $langue) {
                if ($langue->getIsActive()) {
                    $languesList[] = $langue->getName();
                }

            }


            ksort($appointmentsList);
            // dd("kkk", $categoriesList);
            $list[] = [
                "id" => $doctor->getId(),
                "slug" => $doctor->getSlug(),
                "categories" => $doctor->getDoctorCategories(),
                'username' => $doctor->getUsername(),
                'about' => $doctor->getAbout(),
                'avatarUrl' => $doctor->getAvatarUrl(),
                'appoitments' => $appointmentsList,
                'categoriesList' => $categoriesList,
                'languesList' => $languesList,
                'individualPrice' => $individualPriceData,
                'crisisPrice' => $crisisPriceData
            ];
        }
        return $list;

    }


}
