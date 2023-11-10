<?php

namespace App\Repository;

use App\Entity\PromoCode;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PromoCode|null find($id, $lockMode = null, $lockVersion = null)
 * @method PromoCode|null findOneBy(array $criteria, array $orderBy = null)
 * @method PromoCode[]    findAll()
 * @method PromoCode[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PromoCodeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PromoCode::class);
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

    public function findActivePromoCodeByName($name)
    {

        $today = new \DateTime();

        $db = $this->createQueryBuilder('u')
            ->where("u.name = :name")
            ->setParameter('name', $name)
            ->andWhere("u.isActive = :isActive")
            ->setParameter('isActive', true)
            ->andWhere("u.isUsed = :isUsed")
            ->setParameter('isUsed', false)
            ->andWhere("u.isUsed = :isUsed")
            ->setParameter('isUsed', false);

        $results = $db->getQuery()->getResult();

        $items = [];

        foreach ($results as $code) {
            $rangeType = $code->getRangeType();

            if ($rangeType == 'expiration') {
                $expirationDate = $code->getExpirationDate();
                if ($expirationDate > $today) {
                    $items[] = $code;
                }
            } else {
                $items[] = $code;
            }

        }

       

        if (count($items) > 0) {

            return $items[0];
        } else {
            return null;
        }

    }


    // /**
    //  * @return PromoCode[] Returns an array of PromoCode objects
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
    public function findOneBySomeField($value): ?PromoCode
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
