<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\PriceItem;
use App\Entity\AppointmentRule;
use App\Entity\AppointmentOrder;
use App\Helper\DoctorHelper;
use App\Service\EmailService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Service\CodeService;


class DoctorProfileController extends BaseSiteController
{


    /**
     * @Route("/zloz-zamowienie/{doctor}-{slug}/{id}/{priceItem}", name="doctor_profile-order")
     */
    public function index(
        User $doctor,
        $slug,
        AppointmentRule $appointmentRule,
        PriceItem $priceItem,
        Request $request,
        EntityManagerInterface $em,
        EmailService $emailService,
        SessionInterface $session,
        CodeService $codeService
    ) {

        // dd($user);

        if (!$session->get('sessionID')) {
            $this->session->set('sessionID', $codeService->generateUnicode());
        }


        $date = $appointmentRule->getStartDate();
        $time = $date->format('H:i');
        $dayOfWeek = $date->format('N');
        
        $price = $priceItem->getPrice();
        $defaultPrice = $price->getValueForPatient();
        // dd($defaultPrice);
        ///Price 


        

        // $individualPrice = $doctor->getIndividualPrice();
        // $individualPriceData = null;
        // if ($individualPrice) {
        //     $individualPriceData = $individualPrice->getValueForPatient();
        // }

        // $crisisPrice = $doctor->getCrisisPrice();
        // $crisisPriceData = null;
        // if ($crisisPrice) {
        //     $crisisPriceData = $crisisPrice->getValueForPatient();
        // }

        // $defaultPrice = 0;
        // if ($type === "interwencja-kryzysowa") {
        //     $defaultPrice = $crisisPriceData;
        // } else {
        //     $defaultPrice = $individualPriceData;
        // }

        ///apointment

        $appointmentData = [
            "id" => $appointmentRule->getId(),
            "dayOfWeek" => $dayOfWeek,
            "dateString" => $appointmentRule->getStartDate()->format('d.m.Y'),
            "time" => $date->format('H:i'),
            "priceItem" => $priceItem->getId(),
            "priceItemMasterCategoryName" => $priceItem->getMasterCategory()->getName(),
            "avatar" => $doctor->getAvatarUrl(),
            "isUsed" => $appointmentRule->getIsUsed() ? "true" : "false"
        ];

        $categoriesList = [];


        foreach ($doctor->getDoctorCategories() as $category) {
            $categoriesList[] = $category->getName();
        }
        $categoriesString = implode("_", $categoriesList);
// dd($categoriesList);
// dd($defaultPrice);
        return $this->render('frontend/views/appointment/order.html.twig', [
            'doctor' => $doctor,
            'ul' => $this->getUser() ? '1' : '0',
            'categoriesstring' => $categoriesString,
            "appointment" => $appointmentData,
            'defaultPrice' => $defaultPrice
        ]);
    }


    /**
     * @Route("/platnosc-udana", name="appointment-success")
     */
    public function appointmentSuccess()
    {
        return $this->render('frontend/views/appointment/status/appointment-success.html.twig', [
            'returnToOrderUrl' => 'returnToOrderUrl'
        ]);
    }

    /**
     * @Route("/platnosc-nieudana", name="appointment-fail")
     */
    public function appointmentFail()
    {
        return $this->render('frontend/views/appointment/status/appointment-fail.html.twig', [
            'returnToOrderUrl' => 'returnToOrderUrl'
        ]);
    }
}