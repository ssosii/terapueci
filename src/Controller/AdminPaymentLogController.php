<?php

namespace App\Controller;

use App\Entity\PaymentLog;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\PaginatorService;

class AdminPaymentLogController extends BaseSiteController
{
    /**
     * @Route("/admin/platnosci-logs", name="admin_payment-logs")
     */
    public function index($page = 1, PaginatorService $paginatorService)
    {
        $queryPayment = $this->em->getRepository(PaymentLog::class)->queryFindAll();
        $paginate = $paginatorService->paginate($queryPayment, $page, 25);

        return $this->render('admin/views/payment/logs.html.twig', [
             'paginate' =>  $paginate,
        ]);
    }
}
