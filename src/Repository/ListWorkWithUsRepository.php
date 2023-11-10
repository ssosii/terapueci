<?php

namespace App\Repository;

use App\Entity\ListWorkWithUs;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ListWorkWithUs|null find($id, $lockMode = null, $lockVersion = null)
 * @method ListWorkWithUs|null findOneBy(array $criteria, array $orderBy = null)
 * @method ListWorkWithUs[]    findAll()
 * @method ListWorkWithUs[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ListWorkWithUsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ListWorkWithUs::class);
    }

    // /**
    //  * @return ListWorkWithUs[] Returns an array of ListWorkWithUs objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ListWorkWithUs
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
