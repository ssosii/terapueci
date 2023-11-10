<?php

namespace App\Repository;

use App\Entity\PaymentLog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PaymentLog|null find($id, $lockMode = null, $lockVersion = null)
 * @method PaymentLog|null findOneBy(array $criteria, array $orderBy = null)
 * @method PaymentLog[]    findAll()
 * @method PaymentLog[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PaymentLogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PaymentLog::class);
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

    // /**
    //  * @return PaymentLog[] Returns an array of PaymentLog objects
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
    public function findOneBySomeField($value): ?PaymentLog
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
