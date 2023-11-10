<?php

namespace App\Controller;

use App\Entity\Payment;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\PaginatorService;

class AdminPaymentController extends BaseSiteController
{
    /**
     * @Route("/admin/platnosci/{page}", name="admin_payment")
     */
    public function index($page = 1, PaginatorService $paginatorService)
    {
        $queryPayment = $this->em->getRepository(Payment::class)->queryFindAll();
        $paginate = $paginatorService->paginate($queryPayment, $page, 12);

        return $this->render('admin/views/payment/index.html.twig', [
             'paginate' =>  $paginate,
        ]);
    }
}

