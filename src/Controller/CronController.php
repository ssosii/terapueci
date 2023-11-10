<?php

namespace App\Controller;

use App\Entity\AppointmentOrder;

use App\Service\EmailService;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;


class CronController extends BaseSiteController
{



    /**
     * @Route("/remind-notification", name="reminder-notification")
     */
    public function reminderNotification(EmailService $emailService)
    {


        $orders = $this->getRepository(AppointmentOrder::class)->fetchNotoficationReminder();
        foreach ($orders as $order) {
            $order->setIsReminderNotification(true);
            $this->em->persist($order);
            $emailService->sendRemindAppointmentDoctor($order);
            $emailService->sendRemindAppointmentPatient($order);
            
        }
        $this->em->flush();
        // dd($orders);

        return new JsonResponse([
            'status' => "OK",
        ]);
    }



}