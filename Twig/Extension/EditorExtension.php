<?php

namespace TheCodeine\EditorBundle\Twig\Extension;

class EditorExtension extends \Twig_Extension
{
    /**
     * @var boolean
     */
    protected $editorIncluded;

    /**
     * @var string
     */
    protected $basePath;

    /**
     * @var \Twig_Environment
     */
    private $environment;

    public function __construct($autoinclude, $basePath)
    {
        $this->ckeditorIncluded = $autoinclude;
        $this->basePath = rtrim($basePath, '/');
    }

    /**
     * {@inheritDoc}
     */
    public function initRuntime(\Twig_Environment $environment)
    {
        $this->environment = $environment;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'the_codeine_editor';
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return array(
            'include_the_codeine_editor' => new \Twig_Function_Method($this, 'includeEditor', array('is_safe' => array('html'))),
        );
    }

    public function includeEditor()
    {
        if (!$this->environment->hasExtension('assets')) {
            return;
        }

        if (!$this->editorIncluded) {
            $this->editorIncluded = true;
        }

        if (!$this->ckeditorIncluded) {

            $asset = $this->environment
                ->getExtension('assets');
            $jsPath = $asset
                ->getAssetUrl($this->basePath . '/wysihtml5-0.3.0.js');
            $jsPathAdv = $asset
                ->getAssetUrl($this->basePath . '/thecodeine-advanced.js');
            $jsEditor = $asset
                ->getAssetUrl($this->basePath . '/editor.js');

            echo sprintf('<script type="text/javascript" src="%s" type="text/javascript" charset="utf-8"></script>', $jsPath);
            echo sprintf('<script type="text/javascript" src="%s" type="text/javascript" charset="utf-8"></script>', $jsPathAdv);
            echo sprintf('<script type="text/javascript" src="%s" type="text/javascript" charset="utf-8"></script>', $jsEditor);
            $this->ckeditorIncluded = true;
        }
    }
}