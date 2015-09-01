<?php


namespace TheCodeine\EditorBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;

/**
 * Auto adds the Twig form template to the list of resources
 *
 */
class TwigFormPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasParameter('twig.form.resources')) {
            return;
        }

        $container->setParameter('twig.form.resources', array_merge(
            array('TheCodeineEditorBundle:Form:div_layout.html.twig'),
            $container->getParameter('twig.form.resources')
        ));
    }
}