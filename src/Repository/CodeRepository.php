<?php

namespace App\Repository;

use App\Entity\Code;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Code|null find($id, $lockMode = null, $lockVersion = null)
 * @method Code|null findOneBy(array $criteria, array $orderBy = null)
 * @method Code[]    findAll()
 * @method Code[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CodeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Code::class);
    }
    public function queryFindAll()
    {
        return $this->createQueryBuilder('t')
        // ->where('t.isDeleted = :isDeleted')
        // ->setParameter('isDeleted', false)
        ->orderBy('t.id', 'DESC')  
        ->getQuery();
    }
    public function queryCountAll()
    {
        return $this->createQueryBuilder('p')
            ->select('count(p.id)')
            ->where('p.isDeleted = :isDeleted')
            ->setParameter('isDeleted', false)
            ->orderBy('p.id', 'DESC')
            ->getQuery()->getSingleScalarResult();
    }

    // /**
    //  * @return Code[] Returns an array of Code objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Code
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
