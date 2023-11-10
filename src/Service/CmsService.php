<?php


namespace App\Service;


use App\Entity\Cms;
use App\Entity\Faq;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;


class CmsService
{

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }


    public function getFaqItems()
    {

        $list = ["psychoterapia" => [], "rodzajewizyt" => [], "techniczne" => []];
        $faqs = $this->em->getRepository(Faq::class)->findAll();

        foreach ($faqs as $faq) {
            $list[$faq->getType()][] = ['id' => $faq->getId(), 'title' => $faq->getTitle(), 'value' => $faq->getValue()];
        }

        return $list;
    }



    public function getValue($name)
    {
        // $cms = $this->em->getRepository(Cms::class)->findAll();
        // dd($cms);
        $cms = $this->em->getRepository(Cms::class)->findOneBy(["name" => $name]);
        if (!$cms) {
            dd($name);
        }
        return $cms->getValue();
    }


    public function updateValue($name, $value)
    {
        // $cms = $this->em->getRepository(Cms::class)->findAll();
        // dd($cms);
        $cms = $this->em->getRepository(Cms::class)->findOneBy(["name" => $name]);
        if (!$cms) {
            dd($name);
        }
        $cms->setValue($value);
        $this->em->persist($cms);
        $this->em->flush();

        return true;
    }


    public function getForCompany()
    {
        $company_hero_title = $this->getValue('company_hero_title');
        $company_hero_description = $this->getValue('company_hero_description');

        $company_offer1_title = $this->getValue('company_offer1_title');
        $company_offer1_description = $this->getValue('company_offer1_description');

        $company_offer2_title = $this->getValue('company_offer2_title');
        $company_offer2_description = $this->getValue('company_offer2_description');

        $company_offer3_title = $this->getValue('company_offer3_title');
        $company_offer3_description = $this->getValue('company_offer3_description');


        // $company_price1_title = $this->getValue('company_price1_title');
        // $company_price1_description = $this->getValue('company_price1_description');

        // $company_price2_title = $this->getValue('company_price2_title');
        // $company_price2_description = $this->getValue('company_price2_description');

        // $company_price3_title = $this->getValue('company_price3_title');
        // $company_price3_description = $this->getValue('company_price3_description');

        return [
            'company_hero_title' => $company_hero_title,
            'company_hero_description' => $company_hero_description,

            'company_offer1_title' => $company_offer1_title,
            'company_offer1_description' => $company_offer1_description,

            'company_offer2_title' => $company_offer2_title,
            'company_offer2_description' => $company_offer2_description,

            'company_offer3_title' => $company_offer3_title,
            'company_offer3_description' => $company_offer3_description,




            // 'company_price1_title' => $company_price1_title,
            // 'company_price1_description' => $company_price1_description,

            // 'company_price2_title' => $company_price2_title,
            // 'company_price2_description' => $company_price2_description,

            // 'company_price3_title' => $company_price3_title,
            // 'company_price3_description' => $company_price3_description,

        ];


    }


    public function getWorkWithUs()
    {
        $work_hero_title = $this->getValue('work_hero_title');
        $work_hero_description = $this->getValue('work_hero_description');

        $work_offer1_title = $this->getValue('work_offer1_title');
        $work_offer1_description = $this->getValue('work_offer1_description');

        $work_offer2_title = $this->getValue('work_offer2_title');
        $work_offer2_description = $this->getValue('work_offer2_description');

        $work_offer3_title = $this->getValue('work_offer3_title');
        $work_offer3_description = $this->getValue('work_offer3_description');

        $work_offer4_title = $this->getValue('work_offer4_title');
        $work_offer4_description = $this->getValue('work_offer4_description');


        $work_price1_title = $this->getValue('work_price1_title');
        $work_price1_description = $this->getValue('work_price1_description');

        $work_price2_title = $this->getValue('work_price2_title');
        $work_price2_description = $this->getValue('work_price2_description');

        $work_price3_title = $this->getValue('work_price3_title');
        $work_price3_description = $this->getValue('work_price3_description');

        return [
            'work_hero_title' => $work_hero_title,
            'work_hero_description' => $work_hero_description,

            'work_offer1_title' => $work_offer1_title,
            'work_offer1_description' => $work_offer1_description,

            'work_offer2_title' => $work_offer2_title,
            'work_offer2_description' => $work_offer2_description,

            'work_offer3_title' => $work_offer3_title,
            'work_offer3_description' => $work_offer3_description,

            'work_offer4_title' => $work_offer4_title,
            'work_offer4_description' => $work_offer4_description,


            'work_price1_title' => $work_price1_title,
            'work_price1_description' => $work_price1_description,

            'work_price2_title' => $work_price2_title,
            'work_price2_description' => $work_price2_description,

            'work_price3_title' => $work_price3_title,
            'work_price3_description' => $work_price3_description,

        ];


    }

    public function getHomepageData()
    {
        $sg_hero_title = $this->getValue('sg_hero_title');
        $sg_hero_description = $this->getValue('sg_hero_description');

        $sg_why_cat1_title = $this->getValue('sg_why_cat1_title');
        $sg_why_cat1_description = $this->getValue('sg_why_cat1_description');


        $sg_why_cat2_title = $this->getValue('sg_why_cat2_title');
        $sg_why_cat2_description = $this->getValue('sg_why_cat2_description');


        $sg_why_cat3_title = $this->getValue('sg_why_cat3_title');
        $sg_why_cat3_description = $this->getValue('sg_why_cat3_description');


        $sg_why_cat4_title = $this->getValue('sg_why_cat4_title');
        $sg_why_cat4_description = $this->getValue('sg_why_cat4_description');

        $sg_why_cat5_title = $this->getValue('sg_why_cat5_title');
        $sg_why_cat5_description = $this->getValue('sg_why_cat5_description');


        $sg_why_cat5_title = $this->getValue('sg_why_cat5_title');
        $sg_why_cat5_description = $this->getValue('sg_why_cat5_description');

        $sg_why_cat6_title = $this->getValue('sg_why_cat6_title');
        $sg_why_cat6_description = $this->getValue('sg_why_cat6_description');

        $sg_effect_title = $this->getValue('sg_effect_title');
        $sg_effect_description = $this->getValue('sg_effect_description');

        return [
            'sg_hero_title' => $sg_hero_title,
            'sg_hero_description' => $sg_hero_description,

            'sg_why_cat1_title' => $sg_why_cat1_title,
            'sg_why_cat1_description' => $sg_why_cat1_description,

            'sg_why_cat2_title' => $sg_why_cat2_title,
            'sg_why_cat2_description' => $sg_why_cat2_description,


            'sg_why_cat3_title' => $sg_why_cat3_title,
            'sg_why_cat3_description' => $sg_why_cat3_description,

            'sg_why_cat4_title' => $sg_why_cat4_title,
            'sg_why_cat4_description' => $sg_why_cat4_description,

            'sg_why_cat5_title' => $sg_why_cat5_title,
            'sg_why_cat5_description' => $sg_why_cat5_description,

            'sg_why_cat6_title' => $sg_why_cat6_title,
            'sg_why_cat6_description' => $sg_why_cat6_description,


            'sg_effect_title' => $sg_effect_title,
            'sg_effect_description' => $sg_effect_description,

        ];


    }

}
