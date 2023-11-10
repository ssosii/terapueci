<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\IsTrue;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add(
                'email',
                EmailType::class,
                [
                    'attr' => [
                        'class' => 'regular-text regular-text--authorization',
                        'placeholder' => 'Email',
                        'autocomplete' => 'off'
                    ],
                    'label' => false,
                    'translation_domain' => null,
                    'empty_data' => ''
                ]
            )
            // ->add('username', null, [
            //     'attr' => [
            //         'class' => 'regular-text regular-text--authorization',
            //         'placeholder' => 'Nazwa konta',
            //         'autocomplete' => 'off'
            //     ],
            //     'label' => false,
            //     'empty_data' => ''
            // ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Wybrane hasła do siebie nie pasują',
                'options' => [
                    'attr' => [
                        'class' => 'password-field regular-text regular-text--authorization',
                        'autocomplete' => 'off'
                    ]
                ],

                'required' => true,
                'first_options' => [
                    'label' => false,
                    'attr' => [
                        'placeholder' => 'Hasło',
                        'class' => 'regular-text regular-text--authorization'
                    ],
                    'empty_data' => ' '

                ],
                'second_options' => [
                    'label' => false,
                    'attr' => [
                        'placeholder' => 'Powtórz hasło',
                        'class' => 'regular-text regular-text--authorization'
                    ],
                    'empty_data' => ''
                ],
            ]);
            // ->add('agreeTerms', CheckboxType::class, [
            //         'mapped' => false,
            //         'attr' => [
            //             'class' => 'jsSelectFront',
            //         ],
            //         'label_attr' => ['class' => ''],
            //         'label' => false,
            //         'required' => false,
            //         'constraints' => [
            //             new IsTrue([
            //                 'message' => 'Musisz zaakceptować regulamin',
            //             ]),
            //         ],
            //     ]

            // );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}