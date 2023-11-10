<?php

namespace App\Controller;

use App\Entity\AppointmentOrder;
use App\Entity\User;
use App\Entity\Langue;
use App\Entity\Payment;

use App\Service\EmailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\UserService;

class ApiPatientController extends BaseSiteController
{



    /**
     * @Route("/api-update-panel-patient-data-settings", name="api_update-panel-patient-data-settings")
     */
    public function updatePanelPatientSetting(
        UserService $userService,
        Request $request
    ) {


        $patient = $this->getUser();

        if (!$userService->isPatient()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }

        // $patient = $this->em->getRepository(User::class)->findByEmail('pacjent@test.pl');
        $username = $request->request->get('username');
        $phone = $request->request->get('phone');
        $langueID = $request->request->get('langue');
        $email = $request->request->get('email');



        $currentEmail = $patient->getEmail();
        if ($currentEmail !== $email) {
            $isExist = $this->em->getRepository(User::class)->findByEmail($email);
            if ($isExist) {
                return new JsonResponse([
                    'status' => 'NOT',
                    'code' => 400,
                    'message' => "Wybrany email jest już zajęty."
                ]);
            }
            $patient->setEmail($email);
        }

        $patient->setUsername($username);

        if ($phone) {
            $patient->setPhone($phone);
        }

        $langue = $this->em->getRepository(Langue::class)->findOneBy(['id' => $langueID]);

        if ($langue) {
            $patient->getLangues()->clear();
            $patient->setPatientLangue($langue);
        }



        // dd($patient);
        $this->em->persist($patient);
        $this->em->flush();


        return new JsonResponse([
            'status' => "OK",
            // 'userData' => $userData,
            // 'languesList' => $langueList
        ]);




        // return new JsonResponse([
        //     'status' => "NOT",
        // ]);

    }

    /**
     * @Route("/api-patient-send-message", name="api_send-message")
     */
    public function patientSendMessage(
        UserService $userService,
        Request $request,
        EmailService $emailService
    ) {

        if (!$userService->isPatient()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }


        $patient = $this->getUser();
        $topic = $request->request->get("topic");
        $message = $request->request->get("message");

        $emailService->sendPatientMessage($patient, $topic, $message);




        return new JsonResponse([
            'status' => "OK",
        ]);

    }


    /**
     * @Route("/api-fetch-panel-patient-data-settings", name="api_fetch-panel-patient-data-settings")
     */
    public function fetchPanelPatientInitData(
        UserService $userService,
        Request $request
    ) {

        $loggedUser = $this->getUser();
   

        if (!$userService->isPatient()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }

        if ($loggedUser) {

            $userData = [
                'username' => $loggedUser->getUsername(),
                'email' => $loggedUser->getEmail(),
                'phone' => $loggedUser->getPhone(),
                'langue' => $loggedUser->getPatientLangue() ? $loggedUser->getPatientLangue()->getId() : 0,

            ];
            $langueList = [];
            $langues = $this->em->getRepository(Langue::class)->fetchActive();
            foreach ($langues as $langue) {
                $langueList[] = ["id" => $langue->getId(), "name" => $langue->getName()];
            }


            return new JsonResponse([
                'status' => "OK",
                'userData' => $userData,
                'languesList' => $langueList
            ]);

        }


        return new JsonResponse([
            'status' => "NOT",
        ]);

    }


    /**
     * @Route("/api-fetch-panel-patient-payment-by-month-year", name="api_fetch-panel-patient-paynt-by-month-year")
     */
    public function fetchPayments(
        UserService $userService,
        Request $request
    ) {

        $patient = $this->getUser();

        if (!$userService->isPatient()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }
        // dd($patient);
        // $patient = $this->em->getRepository(User::class)->findByEmail('pacjent@test.pl');

        // $doctor = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
        $month = $request->request->get('month');
        $year = $request->request->get('year');
        // $month = '10';
        // $year = '2023';
        $payments = $this->em->getRepository(Payment::class)->fetchForPatientByMonthDay($patient, $year, $month);
        // $allPayments = $this->em->getRepository(Payment::class)->findAll();
        // dd($payments,$allPayments);

        $paymentList = [];
        foreach ($payments as $payment) {
            $order = $payment->getAppointmentOrder();
            $appointmentRule = $order->getAppointmentRule();
            $doctor = $order->getDoctor();

            $date = $order->getSelectedDate();

            $day = $order->getSelectedDate()->format('d');
            $dayOfWeek = $date->format('N');
            $time = $date->format('H:i');

            $key = $day . "-" . $dayOfWeek;

            $appointmentArray = [
                'id' => $appointmentRule->getId(),
                'startDate' => $appointmentRule->getStartDate()->format('d.m.Y')
            ];


            $doctorArray = [
                'id' => $doctor->getId(),
                'username' => $doctor->getUsername(),
                'slug' => $doctor->getSlug(),
            ];

            $item = [
                'id' => $order->getId(),
                'time' => $time,
                'doctor' => $doctorArray,
                'appoitment' => $appointmentArray
            ];

            if (isset($paymentList[$key])) {

                $paymentList[$key]["list"][] = $item;
            } else {
                $paymentList[$key] = [
                    "range" => $key,
                    "list" => [$item]
                ];
            }

        }




        return new JsonResponse([
            'status' => "OK",
            'paymentList' => $paymentList
        ]);

    }


    /**
     * @Route("/api-fetch-panel-patient-appointment-by-month-year-active", name="api_fetch-panel-patient-appointment-by-month-year-active")
     */
    public function fetchVisitsInitData(
        UserService $userService,
        Request $request
    ) {

        $patient = $this->getUser();

        if (!$userService->isPatient()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }
        $doctor = $this->em->getRepository(User::class)->findByEmail('omxd@test.pl');
        // dd($doctor);
        $month = $request->request->get('month');
        $year = $request->request->get('year');
        // $month = '10';
        // $year = '2023';
        $orders = $this->em->getRepository(AppointmentOrder::class)->fetchUsedForPatientActive($patient, $month, $year);

        $now = new \DateTime('now');
        $ordersList = [];
        foreach ($orders as $order) {
            // dd($order);

            $date = $order->getSelectedDate();
            $day = $order->getSelectedDate()->format('d');
            $time = $date->format('H:i');
            $dayOfWeek = $date->format('N');
            $key = $day . "-" . $dayOfWeek;



            $doctor = $order->getDoctor();
            $appointmentRule = $order->getAppointmentRule();

            $doctorArray = [
                'id' => $doctor->getId(),
                'username' => $doctor->getUsername(),
                'slug' => $doctor->getSlug(),
            ];
            $appointmentArray = [
                'id' => $appointmentRule->getId(),
                'startDate' => $appointmentRule->getStartDate()->format('d.m.Y'),
            ];

            $item = [
                'id' => $order->getId(),
                'time' => $time,
                'doctor' => $doctorArray,
                'appoitment' => $appointmentArray,
                'isDeleted' => $order->getIsDeleted()
            ];


            if (isset($ordersList[$key])) {

                $ordersList[$key]["list"][] = $item;
            } else {
                $ordersList[$key] = [
                    "range" => $key,
                    "list" => [$item]
                ];
            }



        }

        return new JsonResponse([
            'status' => "OK",
            'orderList' => $ordersList
        ]);

    }

    /**
     * @Route("/api-fetch-panel-patient-appointment-by-month-year-past", name="api_fetch-panel-patient-appointment-by-month-year-past")
     */
    public function fetchVisitsInitDataPast(
        UserService $userService,
        Request $request
    ) {

        $patient = $this->getUser();
        if (!$userService->isPatient()) {
            return new JsonResponse([
                'status' => "NOT",
                'message' => 'auth'
            ]);
        }
        $doctor = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
        $month = $request->request->get('month');
        $year = $request->request->get('year');
        // $month = '10';
        // $year = '2023';
        $orders = $this->em->getRepository(AppointmentOrder::class)->fetchUsedForPatientPast($patient, $month, $year);

        $now = new \DateTime('now');
        $ordersList = [];
        foreach ($orders as $order) {


            $date = $order->getSelectedDate();
            $day = $order->getSelectedDate()->format('d');
            $time = $date->format('H:i');
            $dayOfWeek = $date->format('N');
            $key = $day . "-" . $dayOfWeek;



            $doctor = $order->getDoctor();
            $appointmentRule = $order->getAppointmentRule();

            $doctorArray = [
                'id' => $doctor->getId(),
                'username' => $doctor->getUsername(),
                'slug' => $doctor->getSlug(),
            ];
            $appointmentArray = [
                'id' => $appointmentRule->getId(),
                'startDate' => $appointmentRule->getStartDate()->format('d.m.Y')
            ];

            $item = [
                'id' => $order->getId(),
                'time' => $time,
                'doctor' => $doctorArray,
                'appoitment' => $appointmentArray
            ];


            if (isset($ordersList[$key])) {

                $ordersList[$key]["list"][] = $item;
            } else {
                $ordersList[$key] = [
                    "range" => $key,
                    "list" => [$item]
                ];
            }



        }

        return new JsonResponse([
            'status' => "OK",
            'orderList' => $ordersList
        ]);

    }
}