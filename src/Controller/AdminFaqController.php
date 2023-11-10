<?php

namespace App\Controller;

use App\Entity\Faq;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class AdminFaqController extends BaseSiteController
{
    /**
     * @Route("/admin/faq", name="admin_faq")
     */
    public function index(): Response
    {

        return $this->render('admin/views/cms/faq.html.twig', [
            'controller_name' => 'adminController',
        ]);
    }

    /**
     * @Route("/admin/faq-init", name="admin_faq-init")
     */
    public function faqInit(): Response
    {

        $faqs = $this->em->getRepository(Faq::class)->findAll();

        $list = ["psychoterapia" => [], "rodzajewizyt" => [], "techniczne" => []];
        foreach ($faqs as $faq) {
            $list[$faq->getType()][] = ['id' => $faq->getId(), 'title' => $faq->getTitle(), 'value' => $faq->getValue()];
        }

        return new JsonResponse([
            'status' => "OK",
            'list' => $list,
        ]);


    }



    /**
     * @Route("/admin/api-update-categories", name="admin_updatefaq")
     */
    public function faqUpdate(Request $request): Response
    {

        $type = $request->request->get('type');
        $list = $request->request->get('list');
        $list = json_decode($list, true);

        $faqs = $this->em->getRepository(Faq::class)->findBy(['type' => $type]);

        foreach ($faqs as $faq) {
            $this->em->remove($faq);
            $this->em->flush();
        }

        foreach ($list as $faq) {
            $faqEn = new Faq();
            $faqEn->setType($type);
            $faqEn->setTitle($faq['title']);
            $faqEn->setValue($faq['value']);
            $this->em->persist($faqEn);
        }
        $this->em->flush();



        return new JsonResponse([
            'status' => "OK",
            'type' => $type,
            'list' => $list
        ]);

    }





}
