<?php

namespace App\Controller;

use App\Entity\AppointmentOrder;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\PaginatorService;
use App\Entity\DoctorCategory;
use Symfony\Component\HttpFoundation\JsonResponse;



class AdminAppointmentOrderController extends BaseSiteController
{
    /**
     * @Route("/admin/wizyty/{page}", name="admin_appointment-order")
     */
    public function index($page = 1,EntityManagerInterface $em, PaginatorService $paginatorService)
    {
        $queryOrders = $em->getRepository(AppointmentOrder::class)->queryFindAll();
        $paginate = $paginatorService->paginate($queryOrders, $page, 12);
        return $this->render('admin/views/appointment-order/list.html.twig', [
            'paginate' =>  $paginate,
        ]);
    }
   
}


// $queryPayment = $this->em->getRepository(Payment::class)->queryFindAll();
// $paginate = $paginatorService->paginate($queryPayment, $page, 12);

// return $this->render('admin/views/payment/index.html.twig', [
//      'paginate' =>  $paginate,
// ]);