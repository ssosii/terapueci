<?php

namespace App\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PaymentRepository")
 */
class Payment
{
  
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $merchantId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $posId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sessionId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $amount;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $originAmount;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $currency;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $orderId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $statement;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sign;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\AppointmentOrder", inversedBy="payment", cascade={"persist", "remove"})
     */
    private $appointmentOrder;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isReturned = false;

    /**
     * @ORM\Column(type="string", length=1000, nullable=true)
     */
    private $reason;


    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;


    public function __construct()
    {
 
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMerchantId(): ?string
    {
        return $this->merchantId;
    }

    public function setMerchantId(?string $merchantId): self
    {
        $this->merchantId = $merchantId;

        return $this;
    }

    public function getPosId(): ?string
    {
        return $this->posId;
    }

    public function setPosId(string $posId): self
    {
        $this->posId = $posId;

        return $this;
    }

    public function getSessionId(): ?string
    {
        return $this->sessionId;
    }

    public function setSessionId(string $sessionId): self
    {
        $this->sessionId = $sessionId;

        return $this;
    }

    public function getAmount(): ?string
    {
        return $this->amount;
    }

    public function setAmount(string $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getOriginAmount(): ?string
    {
        return $this->originAmount;
    }

    public function setOriginAmount(?string $originAmount): self
    {
        $this->originAmount = $originAmount;

        return $this;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(string $currency): self
    {
        $this->currency = $currency;

        return $this;
    }

    public function getOrderId(): ?string
    {
        return $this->orderId;
    }

    public function setOrderId(string $orderId): self
    {
        $this->orderId = $orderId;

        return $this;
    }

    public function getStatement(): ?string
    {
        return $this->statement;
    }

    public function setStatement(string $statement): self
    {
        $this->statement = $statement;

        return $this;
    }

    public function getSign(): ?string
    {
        return $this->sign;
    }

    public function setSign(string $sign): self
    {
        $this->sign = $sign;

        return $this;
    }

    public function getAppointmentOrder(): ?AppointmentOrder
    {
        return $this->appointmentOrder;
    }

    public function setAppointmentOrder(?AppointmentOrder $appointmentOrder): self
    {
        $this->appointmentOrder = $appointmentOrder;

        return $this;
    }

    public function getIsReturned(): ?bool
    {
        return $this->isReturned;
    }

    public function setIsReturned(bool $isReturned): self
    {
        $this->isReturned = $isReturned;

        return $this;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(?string $reason): self
    {
        $this->reason = $reason;

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

}
