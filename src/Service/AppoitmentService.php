<?php

namespace App\Service;


use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Doctrine\ORM\EntityManagerInterface;


class AppoitmentService
{

    private $em;
    private $session;

    public function __construct(EntityManagerInterface $em, SessionInterface $session)
    {
        $this->em = $em;
        $this->session = $session;
    }

    public function normalizeAppointmentEntityWithKeys($appointment, $appointmentsList)
    {

        $date = $appointment->getStartDate();
        $day = $appointment->getStartDate()->format('d');
        $time = $date->format('H:i');
        $startHour = $date->format('H');
        $startHour =  (int)$date->format('H');
        // dd($startHour);
        $dayOfWeek = $date->format('N');
        $appointmentsList[$day . "-" . $dayOfWeek][] = [
            'id' => $appointment->getId(),
            'time' => $time,
            'startHour' => $startHour,
            'finishHour' => $startHour + 1,
            'isUsed' => $appointment->getIsUsed(),
            'startDate' =>$appointment->getStartDate()->format("Y/m/d"),
            'finishDate' =>$appointment->getFinishDate()->format("Y/m/d"),
            'order' => null
        ];
        return $appointmentsList;
    }

    public function normalizeAppointmentEntity($appointment)
    {

        $date = $appointment->getStartDate();
        $time = $date->format('H:i');
        $startHour =  (int)$date->format('H');
        return [
            'id' => $appointment->getId(),
            'time' => $time,
            'isUsed' => $appointment->getIsUsed(),
            'dateToDisplay' => $appointment->getStartDate()->format("d.m"),
            'startHour' => $startHour,
            'finishHour' => $startHour + 1,
            'startDate' =>$appointment->getStartDate()->format("Y/m/d"),
            'finishDate' =>$appointment->getFinishDate()->format("Y/m/d"),
            'order' => null
        ];
    }

}