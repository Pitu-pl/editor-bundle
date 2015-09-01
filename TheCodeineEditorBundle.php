<?php

namespace TheCodeine\EditorBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

use TheCodeine\EditorBundle\DependencyInjection\Compiler\TwigFormPass;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class TheCodeineEditorBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new TwigFormPass());
    }

}
