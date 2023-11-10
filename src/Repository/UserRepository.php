<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function searcherByString($partialName)
    {
        $role = 'ROLE_DOCTOR';
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->where('u.username LIKE :partialName')
            ->setParameter('partialName', '%' . $partialName . '%')
            ->andWhere('u.roles LIKE :roles')
            ->setParameter('roles', '%"' . $role . '"%')
            ->andWhere('u.isActive = :isActive')
            ->setParameter('isActive', true)
            ->orderBy('u.id', 'DESC');
        return $qb->getQuery()->getResult();
    }

    /**
     * Znajduje użytkownika na podstawie google ID
     * @param string $email
     * @return User|null
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findByGoogleID(string $googleID): ?User
    {
        $db = $this->createQueryBuilder('u')
            ->where("u.googleID = :value")
            ->setParameter('value', $googleID);

        return $db->getQuery()->getOneOrNullResult();
    }

    /**
     * Znajduje użytkownika na podstawie google ID
     * @param string $email
     * @return User|null
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findByFacebookID(string $facebookID): ?User
    {
        $db = $this->createQueryBuilder('u')
            ->where("u.facebookID = :value")
            ->setParameter('value', $facebookID);

        return $db->getQuery()->getOneOrNullResult();
    }


    public function searcherByCategoriesAndRanges($page, $masterCategoriesArray, $categoriesArray, $languesArray, $gendersArray, $weekDaysArray, $rangesArray)
    {
        // $langues = [1, 2];
        $role = 'ROLE_DOCTOR';
        $limit = 5;
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u');


        $ranges = [
            8 => ['start' => 9, 'end' => 12],
            12 => ['start' => 12, 'end' => 15],
            15 => ['start' => 15, 'end' => 18],
            18 => ['start' => 18, 'end' => 21]
        ];

        if (is_array($languesArray) && count($languesArray) > 0) {
            $qb->leftJoin('u.langues', 'langues');
            foreach ($languesArray as $langue) {
                $qb->andWhere('langues = :langue')
                    ->setParameter('langue', $langue);
            }


        }

        if (is_array($masterCategoriesArray) && count($masterCategoriesArray) > 0) {
            $qb->leftJoin('u.masterCategories', 'masterCategories');

            foreach ($masterCategoriesArray as $masterCategory) {
                $qb->andWhere('masterCategories = :masterCategory')
                    ->setParameter('masterCategory', $masterCategory);
            }
        }


        if (is_array($categoriesArray) && count($categoriesArray) > 0) {
            $qb->leftJoin('u.doctorCategories', 'doctorCategories');

            foreach ($categoriesArray as $category) {
                $qb->andWhere('doctorCategories = :category')
                    ->setParameter('category', $category);
            }
        }

        if ($gendersArray) {

            foreach ($gendersArray as $gender) {
                $qb->orWhere('u.gender = (:gender)')
                    ->setParameter('gender', $gender);
            }
        }

        // dd($weekDaysArray);


        if (is_array($weekDaysArray) && count($weekDaysArray) > 0) {

            $now = new \DateTime('now');
            $startTime = $now->modify('+24 hours');
            $endTime = new \DateTime('now');
            $endTime->modify('+3 months');
            $qb->leftJoin('u.appointmentRules', 'appointmentRules');

            // dd($qb);
            foreach ($weekDaysArray as $day) {
                // dd($day);
                $qb->andWhere("DAYOFWEEK(appointmentRules.startDate) = (:dayOfWeek)")
                    ->setParameter('dayOfWeek', $day);

                $qb->andWhere('appointmentRules.startDate BETWEEN :startTime AND :endTime')
                    ->setParameter('startTime', $startTime)
                    ->setParameter('endTime', $endTime)

                    ->andWhere('appointmentRules.isUsed = :isUsed')
                    ->setParameter('isUsed', false)
                ;
            }
        }

        if (is_array($rangesArray) && count($rangesArray) > 0) {
            $qb->leftJoin('u.appointmentRules', 'appointmentRules1');
            foreach ($rangesArray as $range) {

                $item = $ranges[$range];

                $start = $item['start'];
                $end = $item['end'];

                // dd($item, $start, $end);

                $qb->andWhere('appointmentRules1.startHour >= :start')
                    ->andWhere('appointmentRules1.finishHour <= :end')
                    ->setParameter('start', $start)
                    ->setParameter('end', $end);

            }


        }

        // if ($rangesArray) {
        //     $qb->leftJoin('u.appointmentRules', 'appointmentRules');
        //     $orX = $qb->expr()->orX();

        //     foreach ($rangesArray as $range) {
        //         // Split the range string into start and end values
        //         list($start, $end) = explode('-', $range);
        //         // dd($start,$end);
        //         $orX->add(
        //             $qb->expr()->andX(
        //                 $qb->expr()->gte('appointmentRules.startDate', ':startRange'),
        //                 $qb->expr()->lte('appointmentRules.startDate', ':endRange')
        //             )
        //         );

        //         $qb->setParameter('startRange', $start);
        //         $qb->setParameter('endRange', $end);
        //     }

        //     $qb->andWhere($orX);
        // }




        // Oblicz początkowy wynik dla paginacji
        $offset = ($page - 1) * $limit;

        // Ustaw paginację
        $qb->setFirstResult($offset)
            ->setMaxResults($limit);

        $qb->andWhere('u.roles LIKE :roles')
            ->setParameter('roles', '%"' . $role . '"%')
            ->andWhere('u.isActive = :isActive')
            ->setParameter('isActive', true)
            ->addOrderBy('u.id', 'DESC');
        return $qb->getQuery()->getResult();



        // if (is_array($categories)) {
        //     $qb->leftJoin('u.doctorCategories', 'doctorCategories');

        //     foreach ($categories as $category) {
        //         $qb->andWhere('doctorCategories IN (:category)')
        //             ->setParameter('category', $category);
        //     }
        // }
        // dd($langues);

        // if ($genders) {

        //     foreach ($genders as $gender) {
        //         $qb->andWhere('u.gender = (:gender)')
        //             ->setParameter('gender', $gender);
        //     }
        // }

        // if ($weekDaysArray) {

        //     $now = new \DateTime('now');
        //     $startTime = $now->modify('+24 hours');
        //     $endTime = new \DateTime('now');
        //     $endTime->modify('+3 months');

        //     $qb->leftJoin('u.appointmentRules', 'appointmentRules');
        //     // dd($qb);
        //     foreach ($weekDaysArray as $day) {
        //         // dd($day);
        //         // $qb->where("DAYOFWEEK(appointmentRules.startDate) IN (:dayOfWeek)")
        //         //     ->setParameter('dayOfWeek', $day);

        //         $qb->andWhere('appointmentRules.startDate BETWEEN :startTime AND :endTime')
        //             ->setParameter('startTime', $startTime)
        //             ->setParameter('endTime', $endTime)

        //             // ->andWhere('appointmentRules.isUsed = :isUsed')
        //             // ->setParameter('isUsed', false)
        //         ;
        //     }
        // }


        // if ($rangesArray) {
        //     $qb->leftJoin('u.appointmentRules', 'appointmentRules');
        //     $orX = $qb->expr()->orX();

        //     foreach ($rangesArray as $range) {
        //         // Split the range string into start and end values
        //         list($start, $end) = explode('-', $range);
        //         // dd($start,$end);
        //         $orX->add(
        //             $qb->expr()->andX(
        //                 $qb->expr()->gte('appointmentRules.startDate', ':startRange'),
        //                 $qb->expr()->lte('appointmentRules.startDate', ':endRange')
        //             )
        //         );

        //         $qb->setParameter('startRange', $start);
        //         $qb->setParameter('endRange', $end);
        //     }

        //     $qb->andWhere($orX);
        // }

        // $qb->andWhere("DAYOFWEEK(u.createdAt) = 1");





    }
    public function fetchByRole($role)
    {
        $qb = $this->_em->createQueryBuilder();
        // $qb->andWhere("DAYOFWEEK(u.createdAt) = 1");
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->where('u.roles LIKE :roles')
            ->setParameter('roles', '%"' . $role . '"%')
            ->addOrderBy('u.isActive', "DESC")
            ->addOrderBy('u.id', 'DESC');

        return $qb->getQuery()->getResult();
    }

    public function queryByRole($role)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->where('u.roles LIKE :roles')
            ->setParameter('roles', '%"' . $role . '"%')
            ->addOrderBy('u.isActive', "DESC")
            ->addOrderBy('u.id', 'DESC');

        return $qb->getQuery();
    }





    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(UserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newHashedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    /**
     * Zwraca użytkownika na podstawie wartości pola
     * @param string $field
     * @param string $value
     * @param bool $active
     * @return User|null
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    private function findByField(string $field, string $value, $active = true): ?User
    {
        $db = $this->createQueryBuilder('u')
            ->where("u.{$field} = :value")
            ->andWhere('u.isActive != :isActive')
            ->setParameter('value', $value);
        if ($active) {
            $db->setParameter('isActive', true);
        } else {
            $db->setParameter('isActive', true);
        }


        return $db->getQuery()->getOneOrNullResult();
    }

    /**
     * Znajduje użytkownika na podstawie adresu email
     * @param string $email
     * @return User|null
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findByEmail(string $email): ?User
    {
        $db = $this->createQueryBuilder('u')
            ->where("u.email = :value")
            ->setParameter('value', $email);

        return $db->getQuery()->getOneOrNullResult();
    }


    public function queryFindAllFull()
    {
        return $this->createQueryBuilder('p')
            ->orderBy('p.id', 'DESC')
            ->getQuery();
    }


    public function fetchByRoleActive($role)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->andWhere('u.roles LIKE :roles')
            ->setParameter('roles', '%"' . $role . '"%')
            ->andWhere('u.isActive = :isActive')
            ->setParameter('isActive', true);

        return $qb->getQuery()->getResult();
    }

    public function fetchByRolePagination($role, $page = 1, $limit = 6)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->andWhere('u.roles LIKE :roles')
            ->setParameter('roles', '%"' . $role . '"%')
            ->andWhere('u.isActive = :isActive')
            ->setParameter('isActive', true);

        // Oblicz początkowy wynik dla paginacji
        $offset = ($page - 1) * $limit;

        // Ustaw paginację
        $qb->setFirstResult($offset)
            ->setMaxResults($limit);
        $qb->orderBy('u.id', 'DESC');
        return $qb->getQuery()->getResult();
    }

    public function fetchByRoleActiveAndCategory($role, $category)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->andWhere('u.roles LIKE :roles')
            ->setParameter('roles', '%"' . $role . '"%')
            ->andWhere('u.isActive = :isActive')
            ->setParameter('isActive', true)


            ->leftJoin('u.doctorCategories', 'doctorCategories')
            ->andWhere('doctorCategories IN (:doctorCategories)')
            ->setParameter('doctorCategories', $category);

        return $qb->getQuery()->getResult();
    }



    public function fetchForSLider()
    {
        $role = 'ROLE_DOCTOR';
        $qb = $this->_em->createQueryBuilder();
        $qb->select('u')
            ->from($this->_entityName, 'u')
            ->andWhere('u.roles LIKE :roles')
            ->setParameter('roles', '%"' . $role . '"%')
            ->andWhere('u.isActive = :isActive')
            ->setParameter('isActive', true)
            ->andWhere('u.isHighlighted = :isHighligted')
            ->setParameter('isHighligted', true)
            ->setMaxResults(30)
            ;


        return $qb->getQuery()->getResult();
    }


    // /**
//  * @return User[] Returns an array of User objects
//  */
/*
public function findByExampleField($value)
{
return $this->createQueryBuilder('u')
->andWhere('u.exampleField = :val')
->setParameter('val', $value)
->orderBy('u.id', 'ASC')
->setMaxResults(10)
->getQuery()
->getResult()
;
}
*/

    /*
    public function findOneBySomeField($value): ?User
    {
    return $this->createQueryBuilder('u')
    ->andWhere('u.exampleField = :val')
    ->setParameter('val', $value)
    ->getQuery()
    ->getOneOrNullResult()
    ;
    }
    */
}