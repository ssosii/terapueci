<?php

namespace App\Controller;

use App\Entity\AppointmentOrder;
use App\Entity\Payment;
use App\Entity\PaymentLog;
use App\Entity\PriceItem;
use App\Entity\PromoCode;
use App\Service\EmailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\UserService;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

use App\Entity\AppointmentRule;
use App\Entity\User;

use App\Service\PaymentService;

use App\Service\CodeService;
use App\Service\AppoitmentService;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use App\Security\LoginFormAuthenticator;


use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\HttpFoundation\Session\Session;


class ApiPaymentController extends BaseSiteController
{




    /**
     * @Route("/api-make-appointment-with-register/{appointmentRule}/{type}", name="api_make-appointment-with-register")
     */
    public function makeAppointmentWithRegister(
        AppointmentRule $appointmentRule,
        $type,
        Request $request,
        AppoitmentService $appoitmentService,
        SessionInterface $session,
        CodeService $codeService,
        PaymentService $paymentService,
        UserPasswordEncoderInterface $passwordEncoder,
        UserService $userService,
        GuardAuthenticatorHandler $guardHandler,
        LoginFormAuthenticator $authenticator
    ) {

        $username = $request->request->get('username');
        $email = $request->request->get('email');
        $password = $request->request->get('password');
        $phone = $request->request->get('phone');
        $message = $request->request->get('message');
        $price = $request->request->get('price');
        $promoCodeId = $request->request->get('promoCodeId');

        $priceItem = $request->request->get('priceItem');
        $priceItem = $this->em->getRepository(PriceItem::class)->findOneBy(['id' => $priceItem]);
        $totalPrice = $price;

        $masterCategory = $priceItem->getMasterCategory();




        // $username = 'username';
        // $email = 'email';
        // $password = 'password';
        // $phone = 'phone';
        // $message = 'message';
        // $price = 'price';
        // $type = 'type';



        // $username = 'username';
        // $email = 'emai22222222222222l@wp.pl';
        // $password = 'password';
        // $phone = 'phone';
        // $message = 'message';


        $user = $this->em->getRepository(User::class)->findByEmail($email);

        if ($user) {
            return new JsonResponse([
                'status' => '',
                'code' => 400,
                'message' => "Wybrany email jest już zajęty."
            ]);
        }



        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPassword(
            $passwordEncoder->encodePassword(
                $user,
                $password
            )
        );
        $user->setSlug($userService->prepareSlug($username));
        $user->setCreatedAt(new \DateTime('now'));

        $user->setRoles(['ROLE_PATIENT']);

        $this->em->persist($user);
        $this->em->flush();

        $guardHandler->authenticateUserAndHandleSuccess(
            $user,
            $request,
            $authenticator,
            'main' // firewall name in security.yaml
        );



        $this->session->set('sessionID', $codeService->generateUnicode());


        $przelewy24Params = $paymentService->getParams();

        $crc = $przelewy24Params['crc'];
        $merchantId = $przelewy24Params['merchantId'];
        $posId = $przelewy24Params['posId'];
        $raportKey = $przelewy24Params['raportKey'];
        $apiUrl = $przelewy24Params['apiUrl'];
        $appUrl = $przelewy24Params['appUrl'];


        $doctor = $appointmentRule->getDoctor();
        $order = new AppointmentOrder();
        $order->setAppointmentRule($appointmentRule);
        $order->setSelectedDate($appointmentRule->getStartDate());
        $order->setDoctor($doctor);
        $order->setPatient($user);
        $order->setType($type);
        $order->setPrice($price);
        $order->setMasterCategory($masterCategory);
        if ($phone) {
            $order->setPhone($phone);
        }
        if ($message) {
            $order->setMessage($message);
        }
        $order->setSessionID($session->get('sessionID'));
        $order->setCreatedAt(new \DateTime());
        $appointmentRule->setIsUsed(true);


        //promoCode

        $promoCode = $this->getRepository(PromoCode::class)->findOneBy(['id' => $promoCodeId]);
        if ($promoCode) {

            $typeCode = $promoCode->getTypeCode();
            $expirationDate = $promoCode->getExpirationDate();
            $rangeType = $promoCode->getRangeType();
            $quota = $promoCode->getQuota();
            $percent = $promoCode->getPercent();
            $name = $promoCode->getName();

            if ($typeCode === "percent") {
                $percentFromPrice = ($percent / 100) * $price;
                $totalPrice = $price - $percentFromPrice;
            }

            if ($typeCode === "quota") {
                $totalPrice = $price - $quota;
            }

            $promoCode->setIsUsed(true);
            $order->setPromoCode($promoCode);
            $this->em->persist($promoCode);


        }



        $order->setTotalPrice($totalPrice);

        $this->em->persist($order);
        $this->em->persist($appointmentRule);
        $this->em->flush();

        $amount = number_format((int) $totalPrice * 100, 0, '.', '');
        $currency = 'PLN';
        $description = "Klient: " . $username . ". " . 'Wizyta u ' . $doctor->getUsername() . " w terminie " . $appointmentRule->getStartDate()->format("Y-m-d H:i");
        $country = 'PL';
        $urlReturn = $appUrl . '/rezerwacja/' . $order->getId() . '/' . $priceItem->getId();
        $urlStatus = $appUrl . '/payment/status';

        $jsonSign = json_encode(
            array(
                "sessionId" => $session->get('sessionID'),
                "merchantId" => intval($merchantId),
                "amount" => intval($amount),
                "currency" => $currency,
                "crc" => $crc
            ),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        $sign = hash('sha384', $jsonSign);
        $data = array(
            "merchantId" => intval($merchantId),
            "posId" => intval($posId),
            "sign" => $sign,
            "amount" => intval($amount),
            "currency" => $currency,
            "description" => $description,
            "email" => $email,
            "country" => $country,
            "urlReturn" => $urlReturn,
            "urlStatus" => $urlStatus,
            "sessionId" => $session->get('sessionID'),
            "method" => 0,
            "client" => $username,
            "language" => "PL"

        );

        $data_string = json_encode($data);
        $parameters = http_build_query($data);
        // print_r($parameters);

        // $ch = curl_init('https://secure.przelewy24.pl/api/v1/transaction/register');
        $ch = curl_init($apiUrl . '/api/v1/transaction/register');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt(
            $ch,
            CURLOPT_USERPWD,
            $merchantId . ":" . $raportKey
        );
        curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        $response = json_decode($result, true);


        $token = isset($response['data']['token']) ? $response['data']['token'] : false;
        // dd($response, $result, $token);
        if ($token) {
            // header("Location: https://secure.przelewy24.pl/trnRequest/" . $token);
            // die();
            return new JsonResponse([
                'status' => "OK",
                'url' => $apiUrl . '/trnRequest/' . $token,
                'amm'
            ]);
        } else {
            $session->set('sessionID', null);
            return new JsonResponse([
                'status' => "",
                'message' => "Coś poszło nie tak."
            ]);
            // return $this->redirect($this->generateUrl('doctor_order-success'));
        }


    }



    /**
     * @Route("/api-make-appointment-for-logged/{patient}/{appointmentRule}/{type}", name="api_make-appointment-for-logged")
     */
    public function makeAppointmentForLogged(User $patient, AppointmentRule $appointmentRule, $type, Request $request, AppoitmentService $appoitmentService, SessionInterface $session, CodeService $codeService, PaymentService $paymentService)
    {



        $patient = $this->getUser();
        $phone = $request->request->get('phone');
        $message = $request->request->get('message');
        $price = $request->request->get('price');
        $promoCodeId = $request->request->get('promoCodeId');
        $totalPrice = $price;


        $priceItem = $request->request->get('priceItem');
        $priceItem = $this->em->getRepository(PriceItem::class)->findOneBy(['id' => $priceItem]);

        $masterCategory = $priceItem->getMasterCategory();
        // $message = "Mee";
        // $phone = "5454";
        // $price = "140";


        // if (!$session->get('sessionID')) {
        $this->session->set('sessionID', $codeService->generateUnicode());
        // }

        // $price = 100;
        // $phone = "phoe";
        // $message = "mes";
        // $type = "terapia-indywidualna";

        // phone, message, price 

        $doctor = $appointmentRule->getDoctor();
        $order = new AppointmentOrder();
        $order->setAppointmentRule($appointmentRule);
        $order->setSelectedDate($appointmentRule->getStartDate());
        $order->setDoctor($doctor);
        $order->setPatient($patient);
        $order->setMasterCategory($masterCategory);
        if ($phone) {
            $order->setPhone($phone);
        }
        $order->setType($type);
        if ($message) {
            $order->setMessage($message);
        }

        $order->setPrice($price);
        $order->setSessionID($session->get('sessionID'));
        $order->setCreatedAt(new \DateTime('now'));


        $appointmentRule->setIsUsed(true);


        //promoCode

        $promoCode = $this->getRepository(PromoCode::class)->findOneBy(['id' => $promoCodeId]);
        if ($promoCode) {

            $typeCode = $promoCode->getTypeCode();
            $expirationDate = $promoCode->getExpirationDate();
            $rangeType = $promoCode->getRangeType();
            $quota = $promoCode->getQuota();
            $percent = $promoCode->getPercent();
            $name = $promoCode->getName();

            if ($typeCode === "percent") {
                $totalPrice = ($percent / 100) * $price;
            }

            if ($typeCode === "quota") {
                $totalPrice = $price - $quota;
            }
            $promoCode->setIsUsed(true);
            $this->em->persist($promoCode);
            $order->setPromoCode($promoCode);

        }


        $order->setTotalPrice($totalPrice);

        $this->em->persist($order);
        $this->em->persist($appointmentRule);
        $this->em->flush();

        // $amount = number_format((int) $price * 100, 0, '.', '');
        // return new JsonResponse([
        //     'status' => "OK",
        //     'amount' => intval($amount)
        // ]);


        // return new JsonResponse([
        //     'status' => "OK",
        //     'url' => $this->generateUrl('appointment-success')
        // ]);






        $name = $patient->getUsername();
        $przelewy24Params = $paymentService->getParams();

        $crc = $przelewy24Params['crc'];
        $merchantId = $przelewy24Params['merchantId'];
        $posId = $przelewy24Params['posId'];
        $raportKey = $przelewy24Params['raportKey'];
        $apiUrl = $przelewy24Params['apiUrl'];
        $appUrl = $przelewy24Params['appUrl'];


        $amount = number_format((int) $totalPrice * 100, 0, '.', '');
        $currency = 'PLN';
        $description = "Klient: " . $name . ". " . 'Wizyta u ' . $doctor->getUsername() . " w terminie " . $appointmentRule->getStartDate()->format("Y-m-d H:i");
        $country = 'PL';
        $urlReturn = $appUrl . '/rezerwacja/' . $order->getId() . '/' . $priceItem->getId();


        $urlStatus = $appUrl . '/payment/status';

        $jsonSign = json_encode(
            array(
                "sessionId" => $session->get('sessionID'),
                "merchantId" => intval($merchantId),
                "amount" => intval($amount),
                "currency" => $currency,
                "crc" => $crc
            ),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        $sign = hash('sha384', $jsonSign);
        $data = array(
            "merchantId" => intval($merchantId),
            "posId" => intval($posId),
            "sign" => $sign,
            "amount" => intval($amount),
            "currency" => $currency,
            "description" => $description,
            "email" => $patient->getEmail(),
            "country" => $country,
            "urlReturn" => $urlReturn,
            "urlStatus" => $urlStatus,
            "sessionId" => $session->get('sessionID'),
            "method" => 0,
            "client" => $name,
            "language" => "PL"

        );

        $data_string = json_encode($data);
        $parameters = http_build_query($data);
        // print_r($parameters);

        // $ch = curl_init('https://secure.przelewy24.pl/api/v1/transaction/register');
        $ch = curl_init($apiUrl . '/api/v1/transaction/register');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt(
            $ch,
            CURLOPT_USERPWD,
            $merchantId . ":" . $raportKey
        );
        curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        $response = json_decode($result, true);


        $token = isset($response['data']['token']) ? $response['data']['token'] : false;
        // dd($response, $result, $token);
        if ($token) {
            // header("Location: https://secure.przelewy24.pl/trnRequest/" . $token);
            // die();
            return new JsonResponse([
                'status' => "OK",
                'url' => $apiUrl . '/trnRequest/' . $token,
            ]);
        } else {
            $session->set('sessionID', null);
            return new JsonResponse([
                'status' => "",
                'message' => "Coś poszło nie tak."
            ]);
            // return $this->redirect($this->generateUrl('doctor_order-success'));
        }


    }






    /**
     * @Route("/payment/status", name="payment_status")
     */
    public function status(Request $request)
    {

        $parameters = json_decode($request->getContent(), true);


        $merchantId = isset($parameters['merchantId']) ? $parameters['merchantId'] : "";
        $posId = isset($parameters['posId']) ? $parameters['posId'] : "";
        $sessionId = isset($parameters['sessionId']) ? $parameters['sessionId'] : "";
        $amount = isset($parameters['amount']) ? $parameters['amount'] : "";
        $originAmount = isset($parameters['originAmount']) ? $parameters['originAmount'] : "";
        $currency = isset($parameters['currency']) ? $parameters['currency'] : "";
        $orderId = isset($parameters['orderId']) ? $parameters['orderId'] : "";
        $statement = isset($parameters['statement']) ? $parameters['statement'] : "";
        $sign = isset($parameters['sign']) ? $parameters['sign'] : "";







        $this->em->flush();
        // $emailHelper->testMail(['order1' => '1']);
        // $emailHelper->testMail(['order1' => $orderId]);
        $paymentResult = $this->em->getRepository(Payment::class)->findOneBy(['orderId' => $orderId]);

        if ($paymentResult) {
            $paymentLog = new PaymentLog();
            $paymentLog->setValue("test" . "jest payment");
            $paymentLog->setCreatedAt(new \DateTime('now'));
            $this->em->persist($paymentLog);

        } else {
            $paymentLog = new PaymentLog();
            $paymentLog->setValue("test" . "nie ma payment" . "orderId: " . $orderId . " sessionID: " . $sessionId);
            $paymentLog->setCreatedAt(new \DateTime('now'));
            $this->em->persist($paymentLog);

        }


        if (!$paymentResult) {

            $payment = new Payment();
            $payment->setMerchantId($merchantId);
            $payment->setPosId($posId);
            $payment->setSessionId($sessionId);
            $payment->setAmount($amount);
            $payment->setCurrency($currency);
            $payment->setOrderId($orderId);
            $payment->setStatement($statement);
            $payment->setSign($sign);
            $payment->setAppointmentOrder($this->em->getRepository(AppointmentOrder::class)->findOneBy(['sessionID' => $sessionId]));

            $this->em->persist($payment);
            $this->em->flush();

            // $paymentLog->setValue("test" . "orderId: " . $orderId . "blad zapisu payment");
            // $paymentLog->setCreatedAt(new \DateTime('now'));
            // $this->em->persist($paymentLog);

        }

        // $crc = '34a0f28d2434c827';

        // $jsonSign = json_encode(
        //     array(
        //         "sessionId" => $sessionId,
        //         'orderId' => intval($orderId),
        //         "amount" => intval($amount),
        //         "currency" => "PLN",
        //         "crc" => $crc
        //     ),
        //     JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        // );
        // $sign = hash('sha384', $jsonSign);

        // $data = array(
        //     'merchantId' => $merchantId,
        //     'posId' => $merchantId,
        //     'sessionId' => $sessionId,
        //     'amount' =>  intval($amount),
        //     'currency' => 'PLN',
        //     'orderId' => intval($orderId),
        //     'sign' => $sign,
        // );

        // $parameters = http_build_query($data);

        // $ch = curl_init('https://sandbox.przelewy24.pl/api/v1/transaction/verify');
        // curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        // curl_setopt($ch, CURLOPT_POST, 1);
        // curl_setopt(
        //     $ch,
        //     CURLOPT_USERPWD,
        //     "145228:55d75ccca285be58b3534b10c9c5a890"
        // );
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // $result = curl_exec($ch);
        // $response = json_decode($result, true);

        return true;
    }



    /**
     * @Route("/rezerwacja/{appoitmentOrder}/{priceItem}", name="doctor_order-success")
     */
    public function success(AppointmentOrder $appoitmentOrder, PriceItem $priceItem, Request $request, SessionInterface $session, EmailService $emailService, PaymentService $paymentService)
    {
        // $emailHelper->testMail();
        $przelewy24Params = $paymentService->getParams();

        $crc = $przelewy24Params['crc'];
        $merchantId = $przelewy24Params['merchantId'];
        $posId = $przelewy24Params['posId'];
        $raportKey = $przelewy24Params['raportKey'];
        $apiUrl = $przelewy24Params['apiUrl'];
        $appUrl = $przelewy24Params['appUrl'];

        $sessionId = $session->get('sessionID');
        if ($sessionId) {
            $payment = $this->em->getRepository(Payment::class)->findOneBy(['sessionId' => $sessionId]);
            if ($payment) {
                $amount = $payment->getAmount();
                $orderId = $payment->getOrderId();
                $merchantId = $payment->getMerchantId();


                $jsonSign = json_encode(
                    array(
                        "sessionId" => $sessionId,
                        'orderId' => intval($orderId),
                        "amount" => intval($amount),
                        "currency" => "PLN",
                        "crc" => $crc
                    ),
                    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
                );
                $sign = hash('sha384', $jsonSign);

                $data = array(
                    'merchantId' => $merchantId,
                    'posId' => $merchantId,
                    'sessionId' => $sessionId,
                    'amount' => intval($amount),
                    'currency' => 'PLN',
                    'orderId' => intval($orderId),
                    'sign' => $sign,
                );

                $parameters = http_build_query($data);
                // test  "145228:55d75ccca285be58b3534b10c9c5a890"
                $ch = curl_init($apiUrl . '/api/v1/transaction/verify');
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt(
                    $ch,
                    CURLOPT_USERPWD,
                    $merchantId . ":" . $raportKey
                );
                curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $result = curl_exec($ch);
                $response = json_decode($result, true);


                $emailService->sendNewAppointmentPatient($appoitmentOrder);
                $emailService->sendNewAppointmentDoctor($appoitmentOrder);


            } else {
                $session->set('sessionID', null);
                // $url=  $this->generateUrl('doctor_profile-order',['doctor' => $doctor->getId() ,'slug'=>'doctor.slug','id'=>'appointmentRule.id','type' =>'type']);

                $doctor = $appoitmentOrder->getDoctor();
                $patient = $appoitmentOrder->getPatient();
                $type = $appoitmentOrder->getType();
                $appoitmentRule = $appoitmentOrder->getAppointmentRule();

                $url = "";
                $appoitmentRule = $appoitmentOrder->getAppointmentRule();
                $appoitmentRule->setIsUsed(false);
                $appoitmentRule->setAppointmentOrder(null);

                $appoitmentOrder->setAppointmentRule(null);

                // dd($appoitmentRule);
                // /zloz-zamowienie/{doctor}-{slug}/{id}/{type}
                $url = $this->generateUrl('doctor_profile-order', ['doctor' => $doctor->getId(), 'slug' => $doctor->getSlug(), 'id' => $appoitmentRule->getId(), 'priceItem' => $priceItem->getId()]);

                $this->em->remove($appoitmentOrder);
                $this->em->persist($appoitmentRule);
                $this->em->flush();

                return $this->render('frontend/views/appointment/status/appointment-fail.html.twig', [
                    'returnToOrderUrl' => $url
                ]);
            }
            $session->set('sessionID', null);
            return $this->render('frontend/views/appointment/status/appointment-success.html.twig', []);
        } else {
            $session->set('sessionID', null);
            return $this->redirect($this->generateUrl('index'));
        }
    }



    /**
     * @Route("/fake-payment", name="fetch")
     */
    public function fakePayment(Session $session, CodeService $codeService): Response
    {

        $sessionId = $session->get('sessionID');
        // dd($sessionId);
        $doctor = $this->em->getRepository(User::class)->findByEmail('lekarz@test.pl');
        $patient = $this->em->getRepository(User::class)->findByEmail('pacjent@test.pl');
        $appoitments = $this->em->getRepository(AppointmentRule::class)->fetchNotUsed();

        $appointmentRule = $appoitments[0];
        $type = "terapia-indywidualna";
        $price = "200";
        $phone = "666";
        $message = "wiadomosc";

        $order = new AppointmentOrder();
        $order->setAppointmentRule($appointmentRule);
        $order->setSelectedDate($appointmentRule->getStartDate());
        $order->setDoctor($doctor);
        $order->setPatient($patient);
        $order->setType($type);
        $order->setPrice($price);
        if ($phone) {
            $order->setPhone($phone);
        }
        if ($message) {
            $order->setMessage($message);
        }
        $order->setSessionID($session->get('sessionID'));
        $order->setCreatedAt(new \DateTime());
        $appointmentRule->setIsUsed(true);


        $this->em->persist($order);
        $this->em->persist($appointmentRule);
        $this->em->flush();


        $merchantId = "merchantId";
        $posId = "posId";
        $amount = 1400;
        $currency = "PLN";
        $orderId = "orderId";
        $statement = "statement";
        $sign = "sign";


        $payment = new Payment();
        $payment->setMerchantId($merchantId);
        $payment->setPosId($posId);
        $payment->setSessionId($sessionId);
        $payment->setAmount($amount);
        $payment->setCurrency($currency);
        $payment->setOrderId($orderId);
        $payment->setStatement($statement);
        $payment->setSign($sign);
        $payment->setAppointmentOrder($order);
        $payment->setCreatedAt(new \DateTime('now'));

        $this->em->persist($payment);
        $this->em->flush();



        dd($doctor, $appoitments, $order, $payment);




        $viewParameters = [];
        return $this->render('frontend/views/pages/work-with-us.html.twig', $viewParameters);
    }


    /**
     * @Route("/api-remove-payment", name="api-remove-payment")
     */
    public function removePayment(Request $request, SessionInterface $session)
    {

        $sessionId = $session->get('sessionID');
        if ($sessionId) {
            $payment = $this->em->getRepository(Payment::class)->findOneBy(['sessionId' => $sessionId]);
            $allPayment = $this->em->getRepository(Payment::class)->findAll();

            // dd($sessionId,$payment,$allPayment);

            if ($payment) {
                // dd($payment->getAppointmentOrder()->getId());

                $this->em->remove($payment);
                $this->em->flush();
            }

        }

    }





    //  /**
//      * @Route("/api-return-payment", name="api-return-payment")
//      */
//     public function returnPayment(Request $request, EntityManagerInterface $em, CodeHelper $codeHelper)
//     {
//         $paymentID = $request->request->get('paymentID');
//         // $paymentID = 40;
//         $reason = $request->request->get('reason');
//         $payment = $em->getRepository(Payment::class)->findOneBy(['id' => $paymentID]);
//         if ($payment) {
//             $data = array(
//                 "requestId" => $codeHelper->generateUnicode(),
//                 "refunds" => array(
//                     array(
//                         "orderId" => $payment->getOrderId(),
//                         "sessionId" => $payment->getSessionId(),
//                         "amount" => $payment->getAmount(),
//                         "description" => "Zwrot do zamówienia nr ZAM/12/234/2020"
//                     )
//                 ),
//                 "refundsUuid" => $codeHelper->generateUnicode(),
//                 "urlStatus" => "https://przelewy24.pl"
//             );

    //             // dd($data);
//             $parameters = http_build_query($data);

    //             $ch = curl_init('https://secure.przelewy24.pl/api/v1/transaction/refund');
//             curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
//             curl_setopt($ch, CURLOPT_POST, 1);
//             curl_setopt(
//                 $ch,
//                 CURLOPT_USERPWD,
//                 "145228:ef3e28b089ba555f2139194458d95321"
//             );
//             curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
//             curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//             $result = curl_exec($ch);
//             $response = json_decode($result, true);


    //             $payment->setReason($reason);
//             $payment->setIsReturned(true);
//             $em->persist($payment);
//             $em->flush();
//             return  new JsonResponse(['status' => true]);
//         }
//         return  new JsonResponse(['status' => false]);
//     }

}