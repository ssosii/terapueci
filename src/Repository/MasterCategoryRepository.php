<?php

namespace App\Repository;

use App\Entity\MasterCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MasterCategory|null find($id, $lockMode = null, $lockVersion = null)
 * @method MasterCategory|null findOneBy(array $criteria, array $orderBy = null)
 * @method MasterCategory[]    findAll()
 * @method MasterCategory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MasterCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MasterCategory::class);
    }



    public function findFromArray($categories)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.id in (:categories)')
            ->setParameter('categories', $categories)
            ->getQuery()
            ->getResult();
    }
    public function fetchActive()
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.isActive = :isActive')
            ->setParameter('isActive', true)
            ->getQuery()
            ->getResult();
    }

    // /**
    //  * @return MasterCategory[] Returns an array of MasterCategory objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MasterCategory
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
