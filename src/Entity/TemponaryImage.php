<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TemponaryImageRepository")
 */
class TemponaryImage
{
    const FILES_IMAGES_LOCATION = "/upload/temponary-image/";
    use TimestampableEntity;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $temponaryFile;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $extension;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isDefault = false;




    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTemponaryFile(): ?string
    {
        return $this->temponaryFile;
    }

    public function setTemponaryFile(?string $temponaryFile): self
    {
        $this->temponaryFile = $temponaryFile;

        return $this;
    }

    public function getExtension(): ?string
    {
        return $this->extension;
    }

    public function setExtension(?string $extension): self
    {
        $this->extension = $extension;

        return $this;
    }
    public function getIsDeleted(): ?bool
    {
        return $this->isDeleted;
    }

    public function setIsDeleted(bool $isDeleted): self
    {
        $this->isDeleted = $isDeleted;

        return $this;
    }

    public function getIsDefault(): ?bool
    {
        return $this->isDefault;
    }

    public function setIsDefault(bool $isDefault): self
    {
        $this->isDefault = $isDefault;

        return $this;
    }
    public function getImageUrl()
    {
        return self::FILES_IMAGES_LOCATION . $this->getId() . '.' . $this->getExtension();
    }
}
