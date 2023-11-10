<?php

namespace App\Repository;

use App\Entity\Langue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Langue|null find($id, $lockMode = null, $lockVersion = null)
 * @method Langue|null findOneBy(array $criteria, array $orderBy = null)
 * @method Langue[]    findAll()
 * @method Langue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LangueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Langue::class);
    }

    public function fetchActive()
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.isActive = :isActive')
            ->setParameter('isActive', true)
            ->getQuery()
            ->getResult();
    }

    public function findFromArray($langues)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.id in (:langues)')
            ->setParameter('langues', $langues)
            ->getQuery()
            ->getResult();
    }

    public function findByName($name){
        return $this->createQueryBuilder('e')
        ->where('e.name LIKE :name')
        ->setParameter('name', '%'.$name.'%') 
        ->setMaxResults(1)
        ->getQuery()
        ->getOneOrNullResult();
    }


    // /**
    //  * @return Langue[] Returns an array of Langue objects
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
    public function findOneBySomeField($value): ?Langue
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
