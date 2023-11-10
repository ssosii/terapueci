<?php

namespace App\Repository;

use App\Entity\Payment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Payment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Payment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Payment[]    findAll()
 * @method Payment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PaymentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Payment::class);
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

    public function fetchForPatientByMonthDay($patient, $year, $month)
    {



        // ->andWhere('selectedDate BETWEEN :startOfMonth AND :endOfMonth')

        // ->andWhere('selectedDate BETWEEN :startOfMonth AND :endOfMonth')

        //    'startOfMonth' => $startOfMonth,
//    'endOfMonth' => $endOfMonth,


        $startDate = new \DateTime("$year-$month-01");
        $startOfMonth = $startDate->modify('first day of this month');

        $startDate = new \DateTime("$year-$month-01");
        $endOfMonth = $startDate->modify('last day of this month');
        $endOfMonth->setTime(23, 59, 59);

        return $this->createQueryBuilder('e')
            ->leftJoin('e.appointmentOrder', 'appointmentOrder')
            ->leftJoin('appointmentOrder.patient', 'patient')

            ->where('patient.id = :patientId')
            ->andWhere('appointmentOrder.selectedDate BETWEEN :startOfMonth AND :endOfMonth')
            ->setParameters([
                'patientId' => $patient,
                'startOfMonth' => $startOfMonth,
                'endOfMonth' => $endOfMonth,

            ])
            ->getQuery()
            ->getResult();


    }




// /**
//  * @return Payment[] Returns an array of Payment objects
//  */
/*
public function findByExampleField($value)
{
return $this->createQueryBuilder('p')
->andWhere('p.exampleField = :val')
->setParameter('val', $value)
->orderBy('p.id', 'ASC')
->setMaxResults(10)
->getQuery()
->getResult()
;
}
*/

/*
public function findOneBySomeField($value): ?Payment
{
return $this->createQueryBuilder('p')
->andWhere('p.exampleField = :val')
->setParameter('val', $value)
->getQuery()
->getOneOrNullResult()
;
}
*/
}