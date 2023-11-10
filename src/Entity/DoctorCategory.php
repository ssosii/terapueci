<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DoctorCategoryRepository")
 */
class DoctorCategory
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="text",nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="text",nullable=true)
     */
    private $type;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isActive = true;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="doctorCategories")
     */
    private $doctors;

    /**
     * @ORM\ManyToOne(targetEntity=MainCategory::class, inversedBy="doctorCategories")
     */
    private $mainCategory;

  

    public function __construct()
    {
        $this->doctors = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    /**
     * @return Collection|User[]
     */
    public function getDoctors(): Collection
    {
        return $this->doctors;
    }

    public function addDoctor(User $doctor): self
    {
        if (!$this->doctors->contains($doctor)) {
            $this->doctors[] = $doctor;
        }

        return $this;
    }

    public function removeDoctor(User $doctor): self
    {
        if ($this->doctors->contains($doctor)) {
            $this->doctors->removeElement($doctor);
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getMainCategory(): ?MainCategory
    {
        return $this->mainCategory;
    }

    public function setMainCategory(?MainCategory $mainCategory): self
    {
        $this->mainCategory = $mainCategory;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }


}