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
        if (!$this->environment->hasExtension('asset')) {
            return;
        }

        if (!$this->editorIncluded) {
            $this->editorIncluded = true;
        }

        if (!$this->ckeditorIncluded) {

            $asset = $this->environment->getExtension('asset');

            $jsJquery = $asset->getAssetUrl($this->basePath . '/js/editor.jquery.js');
            $jsPath = $asset->getAssetUrl($this->basePath . '/js/editor.wysihtml5.js');
            $jsPathAdv = $asset->getAssetUrl($this->basePath . '/js/editor.config.js');
            $jsEditor = $asset->getAssetUrl($this->basePath . '/js/editor.js');

            $cssEditor = $asset->getAssetUrl($this->basePath . '/css/editor.css');

            echo sprintf('<script type="text/javascript" src="%s" type="text/javascript" charset="utf-8"></script>', $jsJquery);
            echo sprintf('<script type="text/javascript" src="%s" type="text/javascript" charset="utf-8"></script>', $jsPath);
            echo sprintf('<script type="text/javascript" src="%s" type="text/javascript" charset="utf-8"></script>', $jsPathAdv);
            echo sprintf('<script type="text/javascript" src="%s" type="text/javascript" charset="utf-8"></script>', $jsEditor);
            echo sprintf('<link rel="stylesheet" href="%s">', $cssEditor);
            $this->ckeditorIncluded = true;
        }
    }
}