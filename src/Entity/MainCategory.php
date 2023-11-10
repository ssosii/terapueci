<?php

namespace App\Entity;

use App\Repository\MainCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MainCategoryRepository::class)
 */
class MainCategory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=DoctorCategory::class, mappedBy="mainCategory")
     */
    private $doctorCategories;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="mainCategories")
     */
    private $doctor;

    public function __construct()
    {
        $this->doctorCategories = new ArrayCollection();
        $this->doctor = new ArrayCollection();
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

    /**
     * @return Collection|DoctorCategory[]
     */
    public function getDoctorCategories(): Collection
    {
        return $this->doctorCategories;
    }

    public function addDoctorCategory(DoctorCategory $doctorCategory): self
    {
        if (!$this->doctorCategories->contains($doctorCategory)) {
            $this->doctorCategories[] = $doctorCategory;
            $doctorCategory->setMainCategory($this);
        }

        return $this;
    }

    public function removeDoctorCategory(DoctorCategory $doctorCategory): self
    {
        if ($this->doctorCategories->removeElement($doctorCategory)) {
            // set the owning side to null (unless already changed)
            if ($doctorCategory->getMainCategory() === $this) {
                $doctorCategory->setMainCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getDoctor(): Collection
    {
        return $this->doctor;
    }

    public function addDoctor(User $doctor): self
    {
        if (!$this->doctor->contains($doctor)) {
            $this->doctor[] = $doctor;
        }

        return $this;
    }

    public function removeDoctor(User $doctor): self
    {
        $this->doctor->removeElement($doctor);

        return $this;
    }

}
