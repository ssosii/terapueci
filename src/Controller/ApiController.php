<?php

namespace App\Controller;

use App\Service\EmailService;
use App\Entity\Newsletter;
use App\Service\CmsService;


use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class ApiController extends BaseSiteController
{


    /**
     * @Route("/api-faq", name="faq-fetch")
     */
    public function fetchApi(
        Request $request,
        CmsService $cmsService
    ) {

        return new JsonResponse([
            'status' => "OK",
            'list' =>  $cmsService->getFaqItems()
        ]);
    }


    /**
     * @Route("/api-send-contact-form", name="api_send-contact-form")
     */
    public function sendContactForm(
        Request $request,
        EmailService $emailService
    ) {


        $username = $request->request->get('username');
        $topic = $request->request->get('topic');
        $email = $request->request->get('email');
        $phone = $request->request->get('phone');
        $message = $request->request->get('message');

        $emailService->sendContactForm($username, $topic, $email, $phone, $message);

        return new JsonResponse([
            'status' => "OK",
        ]);
    }


    /**
     * @Route("/api-save-newsletter", name="api_save-newsletter")
     */
    public function saveNewsletter(
        Request $request,
        EmailService $emailService
    ) {


        $username = $request->request->get('username');
        $email = $request->request->get('email');




        $newsletter = new Newsletter();
        $newsletter->setUsername($username);
        $newsletter->setEmail($email);
        $newsletter->setCreatedAt(new \DateTime('now'));

        $this->em->persist($newsletter);
        $this->em->flush();

        return new JsonResponse([
            'status' => "OK",
        ]);
    }
}
