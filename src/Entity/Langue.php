<?php

namespace App\Entity;

use App\Repository\LangueRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LangueRepository::class)
 */
class Langue
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
     * @ORM\Column(type="boolean")
     */
    private $isActive;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="langues")
     */
    private $doctors;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="patientLangue")
     */
    private $patient;

    

   

    public function __construct()
    {
        $this->doctors = new ArrayCollection();
        $this->patient = new ArrayCollection();
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

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
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
        $this->doctors->removeElement($doctor);

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getPatient(): Collection
    {
        return $this->patient;
    }

    public function addPatient(User $patient): self
    {
        if (!$this->patient->contains($patient)) {
            $this->patient[] = $patient;
            $patient->setPatientLangue($this);
        }

        return $this;
    }

    public function removePatient(User $patient): self
    {
        if ($this->patient->removeElement($patient)) {
            // set the owning side to null (unless already changed)
            if ($patient->getPatientLangue() === $this) {
                $patient->setPatientLangue(null);
            }
        }

        return $this;
    }

   

}
