<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CmsRepository")
 */
class Cms
{
    const IMAGES_LOCATION = "/upload/slider/";
    const BLOCK_IMAGES_LOCATION = "/upload/block/";
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="text",nullable=true)
     */
    private $value;
    /**
     * @ORM\Column(type="text",nullable=true)
     */
    private $title;
    /**
     * @ORM\Column(type="text",nullable=true)
     */
    private $valueLink;

    public function getImageUrl()
    {

        return self::BLOCK_IMAGES_LOCATION  . $this->getValueLink();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getSliderUrl()
    {
        return self::IMAGES_LOCATION;
    }

    public function getValueLink(): ?string
    {
        return $this->valueLink;
    }

    public function setValueLink(string $valueLink): self
    {
        $this->valueLink = $valueLink;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }
}
