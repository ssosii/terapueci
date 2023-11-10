<?php

namespace App\Controller;

use App\Entity\AppointmentRule;
use App\Entity\MasterCategory;
use App\Entity\Price;
use App\Entity\Cms;
use App\Entity\Langue;
use App\Entity\PriceItem;
use App\Entity\User;
use App\Entity\DoctorCategory;
use App\Entity\AppointmentOrder;

use App\Service\EmailService;
use App\Service\UserService;
use App\Service\CmsService;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Session\Session;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;



class IndexController extends BaseSiteController
{
    /**
     * @Route("/", name="index")
     */
    public function index(Session $session,CmsService $cmsService ): Response
    {

        // $all = $this->em->getRepository(Langue::class)->fetchActive();
        // dd($all[0]);
        // $type="niepolski" . $polski->getId();
        // $user->setPatientLangue($all[0]);


        // $cms = $this->em->getRepository(Cms::class)->findAll();
        // dd($cms);
        // $priceItem = 4;
        // $priceItem = $this->em->getRepository(PriceItem::class)->findOneBy(['id' =>$priceItem]);
        // $masterCategory = $priceItem->getMasterCategory();




        // dd($priceItem,$masterCategory);
        //     $price = "140";
        //     $amount = number_format((int) $price * 100, 0, '.', '');
        // $priceItems = $this->em->getRepository(PriceItem::class)->findAll();
        // dd($priceItems);
        //     $user = $this->getUser();
        //     $price = $this->em->getRepository(Price::class)->findOneBy(["isActive" => true]);
        //     $masterCategories = [7,8,9];
        //     $masterCategoriesEntities = $this->em->getRepository(MasterCategory::class)->findFromArray($masterCategories);

        // // dd($masterCategoriesEntities);        
        //     foreach ($user->getMasterCategories() as $c) {
        //         if (!in_array($c->getId(), $masterCategories)) {
        //             $user->removeMasterCategory($c);
        //             $this->em->persist($user);
        //         }
        //     }

        //     foreach ($masterCategoriesEntities as $c) {
        //         if (!$user->getMasterCategories()->contains($c)) {
        //             $user->addMasterCategory($c);
        //             $priceItem = new PriceItem();
        //             $priceItem->setPrice($price);
        //             $priceItem->setMasterCategory($c);
        //             $priceItem->setDoctor($user);
        //             $this->em->persist($priceItem);
        //         }
        //     }

        //      dd($price);



        // $now = new \DateTime('now');
        // $test = (int) $now->format('H');
        // dd($test);
        // dd($this->generateUrl('doctor_profile-order',['doctor' => 'doctor.id' ,'slug'=>'doctor.slug','id'=>'appointmentRule.id','type' =>'type']));

        // dd(intval($amount));
        // dd($this->em->getRepository(Price::class)->findAll());
        // $end =  new \DateTime('2010-10-05');
        // $end->modify('+1 day');

        // $period = new \DatePeriod(
        //     new \DateTime('2010-10-01'),
        //     new \DateInterval('P1D'),
        //     $end
        // );

        // $dateList = [];
        // foreach ($period as $key => $value) {
        //    $dateList[] = $value->format('Y-m-d');
        // }

        // dd($dateList);


        // $now = new \DateTime('now');
        // $startTime = $now->modify('+24 hours'); // Start from 24 hours from now
        // $endTime = new \DateTime('now');
        // $endTime->modify('+3 months'); 

        // dd($startTime,$endTime);

       

        $viewParameters = [
            'doctorsToSLider' => $this->em->getRepository(User::class)->fetchForSLider(),
            'cms' => $cmsService->getHomepageData()
        ];
        return $this->render('frontend/views/index/index.html.twig', $viewParameters);
    }





    /**
     * @Route("/all-user", name="users-path")
     */
    public function users(): Response
    {
        $doctors = $this->em->getRepository(User::class)->fetchByRoleActive('ROLE_DOCTOR');
        dd('$doctors', $doctors);

        $viewParameters = [];
        return $this->render('frontend/views/pages/work-with-us.html.twig', $viewParameters);

    }


    /**
     * @Route("/price-items", name="price-items")
     */
    public function priceItems(): Response
    {
        $doctors = $this->em->getRepository(PriceItem::class)->findAll();
        dd('$priceItems', $doctors);

        $viewParameters = [];
        return $this->render('frontend/views/pages/work-with-us.html.twig', $viewParameters);

    }


    /**
     * @Route("/remove-us/{email}", name="remove-user")
     */
    public function removeUser($email): Response
    {
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $email]);

        if($user){
            $this->em->remove($user);
            $this->em->flush();
            dd("usuniete");
        } else {
            dd("nie usuniete");
        }


        $viewParameters = [];
        return $this->render('frontend/views/pages/work-with-us.html.twig', $viewParameters);

    }




    /**
     * @Route("/test-mail", name="test-mail")
     */
    public function testMail(UserService $userService, EmailService $emailService, MailerInterface $mailer,CmsService $cmsService): Response
    {

    
        // $order = $this->em->getRepository(AppointmentOrder::class)->findOneBy(['id' => '1']);
        // $emailService->sendNewAppointmentPatient($order);
        // $emailService->sendNewAppointmentDoctor($order);
        // dd($order);


        $emailService->testMail();

        // $transport = (new \Swift_SmtpTransport('smtp.dpoczta.pl', 587, 'tls'))
        //     ->setUsername('test@pianolekcje.pl') // Twój login do serwera SMTP
        //     ->setPassword('Getrich12#'); // Twoje hasło do serwera SMTP

        // // Utwórz mailer z danym transportem SMTP
        // $mailer = new \Swift_Mailer($transport);

        // // Utwórz nową wiadomość
        // $message = (new \Swift_Message())
        //     ->setSubject('Temat wiadomości') // Temat wiadomości
        //     ->setFrom(['test@pianolekcje.pl' => 'Twój nadawca']) // Adres nadawcy
        //     ->setTo(['maciejfiglarz333@gmail.com' => 'Odbiorca']); // Adres odbiorcy


        // // Treść wiadomości
        // $message->setBody('To jest treść wiadomości. Możesz używać HTML.', 'text/html');

        // // Próbuj wysłać wiadomość
        // try {
        //     $result = $mailer->send($message);
        //     echo 'Wiadomość została wysłana.';

        //     // Wartość $result zawiera ilość wysłanych wiadomości
        //     // Jeśli $result wynosi zero, to oznacza, że wiadomość nie została wysłana
        // } catch (\Swift_TransportException $e) {
        //     echo 'Błąd w wysyłaniu wiadomości: ' . $e->getMessage();
        // }


        // $transport = (new \Swift_SmtpTransport('smtp.dpoczta.pl', 587, 'STARTTLS'))
        //     ->setUsername('test@pianolekcje.pl') // Twój login do serwera SMTP
        //     ->setPassword('Getrich12#'); // Twoje hasło do serwera SMTP

        // // Utwórz mailer z danym transportem SMTP
        // $mailer = new \Swift_Mailer($transport);

        // // Próbuj nawiązać połączenie
        // try {
        //     $mailer->getTransport()->start();
        //     dd('Połączenie SMTP nawiązane poprawnie.');
        // } catch (\Swift_TransportException $e) {
        //     dd('Błąd w nawiązywaniu połączenia SMTP: ' . $e->getMessage());
        // }

        //     $email = (new Email())
        //     ->from('nadawca@example.com')
        //     ->to('adres_odb@example.com')
        //     ->subject('Testowa wiadomość')
        //     ->text('To jest treść testowej wiadomości.');

        // try {
        //     $sentEmailsCount = $mailer->send($email);
        //     if ($sentEmailsCount > 0) {
        //         dd('Wiadomość została wysłana pomyślnie.');
        //     } else {
        //         dd('Wysłanie wiadomości nie powiodło się.');
        //     }
        // } catch (\Exception $e) {
        //     dd('Wysłanie wiadomości nie powiodło się. Błąd: ' . $e->getMessage());
        // }

        $viewParameters = [
            'doctorsToSLider' => $this->em->getRepository(User::class)->fetchForSLider(),
            'cms' => $cmsService->getHomepageData()
        ];
        return $this->render('frontend/views/index/index.html.twig', $viewParameters);

        // $viewParameters = [];
        // return $this->render('frontend/views/pages/work-with-us.html.twig', $viewParameters);
    }


    /**
     * @Route("/order-user", name="order-user")
     */
    public function fetchForPatientActive(UserService $userService, EmailService $emailService, MailerInterface $mailer,CmsService $cmsService): Response
    {

    
       $user =  $this->getUser();


       $list =[''];

         if($user) {

            $month = "10";
            $year = "2023";
            $orders = $this->em->getRepository(AppointmentOrder::class)->fetchForPatientActive($user,$month,$year);
            dd($orders,$user);
            foreach($orders as $order) {


            }



         }

   
        // $emailService->sendNewAppointmentPatient($order);
        // $emailService->sendNewAppointmentDoctor($order);
        // dd($order);


      
        $viewParameters = [
            'doctorsToSLider' => $this->em->getRepository(User::class)->fetchForSLider(),
        ];
        return $this->render('frontend/views/index/index.html.twig', $viewParameters);

        // $viewParameters = [];
        // return $this->render('frontend/views/pages/work-with-us.html.twig', $viewParameters);
    }



    



}