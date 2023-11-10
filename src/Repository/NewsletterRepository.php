<?php

namespace App\Repository;

use App\Entity\Newsletter;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Newsletter|null find($id, $lockMode = null, $lockVersion = null)
 * @method Newsletter|null findOneBy(array $criteria, array $orderBy = null)
 * @method Newsletter[]    findAll()
 * @method Newsletter[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsletterRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Newsletter::class);
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


    public function findByIds($ids)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.id in (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }

    // /**
    //  * @return Newsletter[] Returns an array of Newsletter objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Newsletter
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
