<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

use App\Service\PaginatorService;


class AdminPatientController extends BaseSiteController
{
    /**
     * @Route("/admin/pacjenci/{page}", name="admin_patient")
     */
    public function index(
        $page = 1,
        EntityManagerInterface $em,
        PaginatorService $paginatorService
    ) {
        $query = $em->getRepository(User::class)->queryByRole('ROLE_PATIENT');

        // $query = $this->em->getRepository(User::class)->queryFetchAll();



        $paginate = $paginatorService->paginate($query, $page, 12);
        return $this->render('admin/views/patient/list.html.twig', [
            'paginate' => $paginate
        ]);
    }
}