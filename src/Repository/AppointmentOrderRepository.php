<?php

namespace App\Repository;

use App\Entity\AppointmentOrder;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AppointmentOrder|null find($id, $lockMode = null, $lockVersion = null)
 * @method AppointmentOrder|null findOneBy(array $criteria, array $orderBy = null)
 * @method AppointmentOrder[]    findAll()
 * @method AppointmentOrder[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AppointmentOrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AppointmentOrder::class);
    }

    public function queryFindAll()
    {

        // $startDate = new \DateTime('16-02-2021', new \DateTimeZone('Europe/Warsaw'));

        return $this->createQueryBuilder('c')
            ->orderBy('c.id', 'DESC')
            // ->andWhere('c.createdAt > :date')
            // ->setParameter('date', $startDate)
            ->getQuery();
    }


    public function fetchNotoficationReminder()
    {
        $now = new \DateTime('now');
        $now->modify('+24 hours');
        
        return $this->createQueryBuilder('e')
            ->andWhere('e.selectedDate < :now')
            ->andWhere('e.isReminderNotification = :isReminderNotification')
            ->setParameters([
                'now' => $now,
                'isReminderNotification' => false
            ])
            ->getQuery()
            ->setMaxResults(30)
            ->getResult();
    }

    public function fetchUsedForPatientActive($patient, $month, $year)
    {

        $startDate = new \DateTime("$year-$month-01");
        $startOfMonth = $startDate->modify('first day of this month');

        $startDate = new \DateTime("$year-$month-01");
        $endOfMonth = $startDate->modify('last day of this month');
        $endOfMonth->setTime(23, 59, 59);


        // dd($startOfMonth,$endOfMonth);

        $now = new \DateTime("now");


        return $this->createQueryBuilder('e')
            ->andWhere('e.patient = :patient')
            ->andWhere('e.selectedDate BETWEEN :startOfMonth AND :endOfMonth')
            ->andWhere('e.selectedDate > :now')
            ->setParameters([
                'patient' => $patient,
                'startOfMonth' => $startOfMonth,
                'endOfMonth' => $endOfMonth,
                'now' => $now
            ])
            // ->orderBy('e.selectedDate', 'DESC')
            // ->orderBy('e.id', 'DESC')
            ->getQuery()
            ->getResult();
    }


    public function fetchForPatientActive($patient, $month, $year)
    {

        $startDate = new \DateTime("$year-$month-01");
        $startOfMonth = $startDate->modify('first day of this month');

        $startDate = new \DateTime("$year-$month-01");
        $endOfMonth = $startDate->modify('last day of this month');
        $endOfMonth->setTime(23, 59, 59);
        $now = new \DateTime("now");






        return $this->createQueryBuilder('e')
            ->andWhere('e.patient = :patient')
            // ->andWhere('e.selectedDate BETWEEN :startOfMonth AND :endOfMonth')
            // ->andWhere('e.selectedDate > :now')
            ->setParameters([
                'patient' => $patient,
                // 'startOfMonth' => $startOfMonth,
                // 'endOfMonth' => $endOfMonth,
                // 'now' => $now
            ])
            // ->orderBy('e.selectedDate', 'DESC')
            // ->orderBy('e.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function fetchUsedForPatientPast($patient, $month, $year)
    {



        $startDate = new \DateTime("$year-$month-01");
        $startOfMonth = $startDate->modify('first day of this month');

        $startDate = new \DateTime("$year-$month-01");
        $endOfMonth = $startDate->modify('last day of this month');
        $endOfMonth->setTime(23, 59, 59);
        // dd("yy");
        $now = new \DateTime("now");

        return $this->createQueryBuilder('e')
            ->andWhere('e.patient = :patient')
            ->andWhere('e.selectedDate BETWEEN :startOfMonth AND :endOfMonth')
            ->andWhere('e.selectedDate < :now')
            ->setParameters([
                'patient' => $patient,
                'startOfMonth' => $startOfMonth,
                'endOfMonth' => $endOfMonth,
                'now' => $now
            ])
            ->orderBy('e.selectedDate', 'DESC')
            // ->orderBy('e.id', 'DESC')
            ->getQuery()
            ->getResult();
    }


    // /**
    //  * @return AppointmentOrder[] Returns an array of AppointmentOrder objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AppointmentOrder
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
