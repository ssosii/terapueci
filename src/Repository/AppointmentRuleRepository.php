<?php

namespace App\Repository;

use App\Entity\AppointmentRule;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AppointmentRule|null find($id, $lockMode = null, $lockVersion = null)
 * @method AppointmentRule|null findOneBy(array $criteria, array $orderBy = null)
 * @method AppointmentRule[]    findAll()
 * @method AppointmentRule[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AppointmentRuleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AppointmentRule::class);
    }


    public function queryByDoctor($doctor)
    {

        return $this->createQueryBuilder('e')
            ->andWhere('e.doctor = :doctor')
            ->setParameter('doctor', $doctor)
            ->orderBy('e.selectedDate', 'DESC')
            ->orderBy('e.id', 'DESC')
            ->getQuery();
    }
    public function fetchByDoctor($doctor)
    {

        return $this->createQueryBuilder('e')
            ->andWhere('e.doctor = :doctor')
            ->setParameter('doctor', $doctor)
            ->orderBy('e.selectedDate', 'DESC')
            ->orderBy('e.id', 'DESC')
            ->getQuery()
            ->getResult();
    }
    public function fetchByDoctorWithYearAndMonthParams($doctor, $year, $month)
    {


        // ->andWhere('e.doctor = :doctor')
        // ->setParameter('doctor', $doctor)
        // // ->orderBy('e.selectedDate', 'DESC')
        // ->orderBy('e.id', 'DESC')
        // ->getQuery();
        // $order->setSelectedDate(new \DateTime($selectedDate, new \DateTimeZone('Europe/Warsaw')));

        $startDate = new \DateTime("$year-$month-01");
        $startOfMonth = $startDate->modify('first day of this month');

        $startDate = new \DateTime("$year-$month-01");
        $endOfMonth = $startDate->modify('last day of this month');
        $endOfMonth->setTime(23, 59, 59);
        // dd($startOfMonth,$endOfMonth);


        return $this->createQueryBuilder('e')
            ->andWhere('e.doctor = :doctor')
            ->andWhere('e.startDate BETWEEN :startOfMonth AND :endOfMonth')
            // ->andWhere('e.isActive = :isActive')
            ->setParameters([
                'doctor' => $doctor->getId(),
                'startOfMonth' => $startOfMonth,
                'endOfMonth' => $endOfMonth,
                // 'isActive' => true
            ])
            ->orderBy('e.startDate', 'ASC')
            // ->orderBy('e.id', 'DESC')
            ->getQuery()
            ->getResult();
    }
    


    public function fetchByDoctorWithYearAndMonthUsedParams($doctor, $year, $month)
    {


        $startDate = new \DateTime("$year-$month-01");
        $startOfMonth = $startDate->modify('first day of this month');

        $startDate = new \DateTime("$year-$month-01");
        $endOfMonth = $startDate->modify('last day of this month');
        $endOfMonth->setTime(23, 59, 59);

        return $this->createQueryBuilder('e')
            ->andWhere('e.doctor = :doctor')
            ->andWhere('e.startDate BETWEEN :startOfMonth AND :endOfMonth')
            ->andWhere('e.isUsed = :isUsed')
            ->setParameters([
                'doctor' => $doctor->getId(),
                'startOfMonth' => $startOfMonth,
                'endOfMonth' => $endOfMonth,
                'isUsed' => true
            ])
            ->orderBy('e.startDate', 'DESC')
            // ->orderBy('e.id', 'DESC')
            ->getQuery()
            ->getResult();
    }



    public function fetchByDoctorForValidRange($doctor, $fromDate, $endDate)
    {

        $dateFrom = new \DateTime($fromDate);
        $dateFrom->setTime(0, 0, 1);
        $dateTo = new \DateTime($endDate);
        $dateTo->setTime(23, 59, 59);

        return $this->createQueryBuilder('e')
            ->andWhere('e.doctor = :doctor')
            ->andWhere('e.startDate BETWEEN :startDay AND :endDay')
            ->setParameters([
                'doctor' => $doctor->getId(),
                'startDay' => $dateFrom,
                'endDay' => $dateTo,
            ])
            ->getQuery()
            ->getResult();

    }

    public function fetchByDoctorForSingleDate($doctor, $from, $to)
    {


        $dateFrom = new \DateTime($from);
        $dateFrom->setTime(0, 0, 1);
        $dateTo = new \DateTime($to);
        $dateTo->setTime(23, 59, 59);

        return $this->createQueryBuilder('e')
            ->andWhere('e.doctor = :doctor')
            ->andWhere('e.startDate BETWEEN :startDay AND :endDay')
            ->setParameters([
                'doctor' => $doctor->getId(),
                'startDay' => $dateFrom,
                'endDay' => $dateTo,
            ])
            ->getQuery()
            ->getResult();
    }

    public function fetchAvailableDaysSinceTomorrow($doctor)
    {
        $tommorow = new \DateTime('tomorrow', new \DateTimeZone('Europe/Warsaw'));

        return $this->createQueryBuilder('e')
            ->andWhere('e.doctor = :doctor')
            ->setParameter('doctor', $doctor)
            ->andWhere('e.selectedDate >= :selectedDate')
            ->setParameter('selectedDate', $tommorow)
            ->getQuery()
            ->getResult();
    }

    public function fetchNotUsedMin24hAndTo3Months($doctor)
    {
        $fromNow = new \DateTime(); //now
        $from = (clone $fromNow)->add(new \DateInterval("PT24H"));

        $to = new \DateTime('now');
        $to->modify('+3 month');
        // dd($from);
        return $this->createQueryBuilder('e')
            ->andWhere('e.doctor = :doctor')
            ->setParameter('doctor', $doctor)
            ->andWhere('e.startDate > :startDateFrom')
            ->setParameter('startDateFrom', $from)
            ->andWhere('e.startDate < :startDateTo')
            ->setParameter('startDateTo', $to)
            ->andWhere('e.isUsed <= :isUsed')
            ->setParameter('isUsed', false)
            ->getQuery()
            ->getResult();
    }


    public function fetchNotUsed()
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.isUsed = :isUsed')
            ->setParameter('isUsed', false)
            ->getQuery()
            ->getResult();
    }

// /**
//  * @return AppointmentRule[] Returns an array of AppointmentRule objects
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
public function findOneBySomeField($value): ?AppointmentRule
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