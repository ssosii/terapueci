<?php

namespace App\Controller;

use App\Entity\AppointmentOrder;
use App\Entity\AppointmentRule;
use App\Entity\PromoCode;
use App\Entity\User;
use App\Entity\Payment;


use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Service\AppoitmentService;


class ApiAppointmentController extends BaseSiteController
{


    /**
     * @Route("/api-check-promocode", name="api_check-promocode")
     */
    public function apiCheckPromoCode(Request $request)
    {


        $parameters = json_decode($request->getContent(), true);

        $promoCode = $parameters && isset($parameters['promoCode']) ? $parameters['promoCode'] : null;
        if ($promoCode) {
            // $promoCode = 'expirationdaytoday27';

            $promoCodeEntity = $this->em->getRepository(PromoCode::class)->findActivePromoCodeByName($promoCode);

            return new JsonResponse([
                'status' => "OK",
                'promoCodeId' => $promoCodeEntity ? $promoCodeEntity->getId() : null,
            ]);
        }
        return new JsonResponse([
            'status' => "",
            'message' => "Ten termin jest już niedostępny."
        ]);


    }



    /**
     * @Route("/api-fetch-data-for-appointment/{doctor}/{appointment}", name="api_fetch-data-for-appointment")
     */
    public function apiFetchDataForAppointment(User $doctor, AppointmentRule $appointment, Request $request, AppoitmentService $appoitmentService)
    {

        $user = $this->getUser();

        // dd($doctor,$appointment);

        if (!$doctor || !$appointment) {

            return new JsonResponse([
                'status' => "",
                'message' => "Ten termin jest już niedostępny."
            ]);

        }

        if ($appointment->getIsUsed()) {
            return new JsonResponse([
                'status' => "",
                'message' => "Ten termin jest już zajety."
            ]);
        }


        return new JsonResponse([
            'status' => "OK",
            'user' => [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
            ],
        ]);



    }


    /**
     * @Route("/payment/status", name="payment_status")
     */
    public function status(Request $request, EmailHelper $emailHelper, EntityManagerInterface $em)
    {

        $parameters = json_decode($request->getContent(), true);

        //  $emailHelper->testMail();

        $merchantId = isset($parameters['merchantId']) ? $parameters['merchantId'] : "";
        $posId = isset($parameters['posId']) ? $parameters['posId'] : "";
        $sessionId = isset($parameters['sessionId']) ? $parameters['sessionId'] : "";
        $amount = isset($parameters['amount']) ? $parameters['amount'] : "";
        $originAmount = isset($parameters['originAmount']) ? $parameters['originAmount'] : "";
        $currency = isset($parameters['currency']) ? $parameters['currency'] : "";
        $orderId = isset($parameters['orderId']) ? $parameters['orderId'] : "";
        $statement = isset($parameters['statement']) ? $parameters['statement'] : "";
        $sign = isset($parameters['sign']) ? $parameters['sign'] : "";
        // $emailHelper->testMail(['order1' => '1']);
        // $emailHelper->testMail(['order1' => $orderId]);
        $paymentResult = $em->getRepository(Payment::class)->findOneBy(['orderId' => $orderId]);

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
            $payment->setAppointmentOrder($em->getRepository(AppointmentOrder::class)->findOneBy(['sessionID' => $sessionId]));
            $payment->setCreatedAt(new \DateTime('now'));

            $em->persist($payment);
            $em->flush();
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


}