<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;


/**
 * @ORM\Entity(repositoryClass="App\Repository\AppointmentOrderRepository")
 */
class AppointmentOrder
{
    // use TimestampableEntity;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $phone;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $totalPrice;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sessionID;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $message;

    /**
     * @ORM\Column(type="datetime")
     */
    private $selectedDate;


  

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Code", cascade={"persist", "remove"})
     */
    private $code;


    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Code", mappedBy="relationOrder")
     */
    private $codes;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Payment", mappedBy="appointmentOrder", cascade={"persist", "remove"})
     */
    private $payment;

    /**
     * @ORM\OneToOne(targetEntity=AppointmentRule::class, inversedBy="appointmentOrder", cascade={"persist", "remove"})
     */
    private $appointmentRule;


    /**
     * @ORM\Column(type="boolean")
     */
    private $isReminderNotification = false;


    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=MasterCategory::class, inversedBy="appoitmentOrder")
     */
    private $masterCategory;

    /**
     * @ORM\OneToOne(targetEntity=PromoCode::class, mappedBy="appointmentOrder", cascade={"persist", "remove"})
     */
    private $promoCode;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isDeleted = false;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="patientAppointmentOrders")
     */
    private $patient;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="doctorAppointmentsOrder")
     */
    private $doctor;




    public function __construct()
    {
        $this->codes = new ArrayCollection();

    }



    public function getId(): ?int
    {
        return $this->id;
    }


    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }



    public function getCode(): ?Code
    {
        return $this->code;
    }

    public function setCode(?Code $code): self
    {
        $this->code = $code;

        return $this;
    }



    /**
     * @return Collection|Code[]
     */
    public function getCodes(): Collection
    {
        return $this->codes;
    }

    public function addCode(Code $code): self
    {
        if (!$this->codes->contains($code)) {
            $this->codes[] = $code;
            $code->setRelationOrder($this);
        }

        return $this;
    }

    public function removeCode(Code $code): self
    {
        if ($this->codes->contains($code)) {
            $this->codes->removeElement($code);
            // set the owning side to null (unless already changed)
            if ($code->getRelationOrder() === $this) {
                $code->setRelationOrder(null);
            }
        }

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getSessionID(): ?string
    {
        return $this->sessionID;
    }

    public function setSessionID(string $sessionID): self
    {
        $this->sessionID = $sessionID;

        return $this;
    }

    public function getPayment(): ?Payment
    {
        return $this->payment;
    }

    public function setPayment(?Payment $payment): self
    {
        $this->payment = $payment;

        // set (or unset) the owning side of the relation if necessary
        $newAppointmentOrder = null === $payment ? null : $this;
        if ($payment->getAppointmentOrder() !== $newAppointmentOrder) {
            $payment->setAppointmentOrder($newAppointmentOrder);
        }

        return $this;
    }

    public function getAppointmentRule(): ?AppointmentRule
    {
        return $this->appointmentRule;
    }

    public function setAppointmentRule(?AppointmentRule $appointmentRule): self
    {
        $this->appointmentRule = $appointmentRule;

        return $this;
    }


    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getSelectedDate(): ?\DateTimeInterface
    {
        return $this->selectedDate;
    }

    public function setSelectedDate(\DateTimeInterface $selectedDate): self
    {
        $this->selectedDate = $selectedDate;

        return $this;
    }

    public function getIsReminderNotification(): ?bool
    {
        return $this->isReminderNotification;
    }

    public function setIsReminderNotification(bool $isReminderNotification): self
    {
        $this->isReminderNotification = $isReminderNotification;

        return $this;
    }

    public function getMasterCategory(): ?MasterCategory
    {
        return $this->masterCategory;
    }

    public function setMasterCategory(?MasterCategory $masterCategory): self
    {
        $this->masterCategory = $masterCategory;

        return $this;
    }


    public function getTotalPrice(): ?string
    {
        return $this->totalPrice;
    }

    public function setTotalPrice(string $totalPrice): self
    {
        $this->totalPrice = $totalPrice;

        return $this;
    }

    public function getPromoCode(): ?PromoCode
    {
        return $this->promoCode;
    }

    public function setPromoCode(?PromoCode $promoCode): self
    {
        // unset the owning side of the relation if necessary
        if ($promoCode === null && $this->promoCode !== null) {
            $this->promoCode->setAppointmentOrder(null);
        }

        // set the owning side of the relation if necessary
        if ($promoCode !== null && $promoCode->getAppointmentOrder() !== $this) {
            $promoCode->setAppointmentOrder($this);
        }

        $this->promoCode = $promoCode;

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

    public function getPatient(): ?User
    {
        return $this->patient;
    }

    public function setPatient(?User $patient): self
    {
        $this->patient = $patient;

        return $this;
    }

    public function getDoctor(): ?User
    {
        return $this->doctor;
    }

    public function setDoctor(?User $doctor): self
    {
        $this->doctor = $doctor;

        return $this;
    }



}
