<?php

namespace App\Controller;

use App\Entity\Newsletter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\PaginatorService;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Code;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class AdminNewsletterController extends BaseSiteController
{
    /**
     * @Route("/admin/newsletter/{page}", name="admin_newsletter")
     */
    public function index($page = 1, PaginatorService $paginatorService): Response
    {

        $queryPayment = $this->em->getRepository(Newsletter::class)->queryFindAll();
        $paginate = $paginatorService->paginate($queryPayment, $page, 12);


        return $this->render('admin/views/newsletter/list.html.twig', [
            'paginate' => $paginate,
        ]);
    }


    /**
     * @Route("/admin/api-fetch-newsletter", name="admin_newsletter-api-update")
     */
    public function newsletterFetch(): Response
    {

        $list = [];
        $newsletters = $this->em->getRepository(Newsletter::class)->findAll();



        foreach ($newsletters as $newsletter) {
            $list[] = ['id' => $newsletter->getId(), 'username' => $newsletter->getUsername(), 'email' => $newsletter->getEmail()];
        }

        return new JsonResponse([
            'status' => "OK",
            'list' => $list
        ]);


    }




    /**
     * @Route("/admin/generate-file", name="csv_range")
     */
    public function csvRange(Request $request, EntityManagerInterface $em)
    {


        $list = $request->request->get('list');
        $list = json_decode($list, true);
        // $code = $em->getRepository(Code::class)->findByRange($start, $end);
        $newsletters = $em->getRepository(Newsletter::class)->findByIds($list);
        // $newsletters = $em->getRepository(Newsletter::class)->findByRange($list);
        $list = [];
        foreach ($newsletters as $c) {
            // $selectedDate = $c->getSelectedDate() ? $c->getSelectedDate()->format('m-d-Y') : null;
            // $name = "";
            // if ($c->getRelationOrder()) {
            //     $name = $c->getRelationOrder()->getName();
            // }
            $list[] = [$c->getEmail(),$c->getUsername()];
        }


        // $fp = fopen('php://output', 'w');
        $fp = fopen('newsletter.csv', 'w');

        foreach ($list as $fields) {

            fputcsv($fp, $fields);
        }
        fclose($fp);



        return new JsonResponse([
            'status' => "OK",
            'list' => $list
        ]);

        // return $this->redirect($this->generateUrl('csv_range', ['start' => $firstElement, 'end' => $lastElement]));
        // return $this->redirect($this->generateUrl('admin_code'));
        // return new BinaryFileResponse('file.csv');
        // $response = new Response();
        // $response->headers->set('Content-Type', 'text/csv');
        // $response->headers->set('Pragma', 'no-cache');
        // $response->headers->set('Expires', '0');

        // $response->sendHeaders();
        // $response->sendContent();
        // $response->headers->set('Content-Disposition', 'attachment; filename="testing.csv"');

        // return $response;
    }
    /**
     * @Route("/download", name="download_file")
     **/
    public function downloadFileAction()
    {
        $response = new BinaryFileResponse('newsletter.csv');
        // $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, 'codes.csv');
        $disposition = HeaderUtils::makeDisposition(
            HeaderUtils::DISPOSITION_ATTACHMENT,
            'code.csv'
        );
        $response->headers->set('Content-Disposition', $disposition);

        return $response;
    }
    /**
     * @Route("/csv-single-{code}", name="csv_single")
     */
    public function csvSingle(Code $code, EntityManagerInterface $em)
    {
        // $list = array(
        //     //these are the columns
        //     array('Firstname', 'Lastname',),
        //     //these are the rows
        //     array('Andrei', 'Boar'),
        //     array('John', 'Doe')
        // );


        $fp = fopen('php://output', 'w');
        if ($code) {
            fputcsv($fp, [$code->getValue()]);
        }

        $response = new Response();
        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="testing.csv"');

        return $response;
    }


}
