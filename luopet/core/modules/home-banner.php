<?php

// -----------------------------------------------------------------------------
// Register
// -----------------------------------------------------------------------------
// Modulo
$acf_home_banners = new Module('acf_home_banners', 'Banners');

// Fields
$acf_home_banners->set_field('repeater', '', 'banners',
    array (
        array (
            'key'          => 'field_banners_imagem',
            'label'        => 'Imagem',
            'name'         => 'imagem',
            'type'         => 'image',
            'required'     => 1,
            'save_format'  => 'url',
            'preview_size' => 'thumbnail',
            'library'      => 'uploadedTo',
        ),
        array (
            'key'        => 'field_banners_titulo',
            'label'      => 'Titulo',
            'name'       => 'titulo',
            'type'       => 'text',
            'formatting' => 'none',
        ),
        array (
            'key'         => 'field_banners_link',
            'label'       => 'Link',
            'name'        => 'link',
            'type'        => 'text',
            'placeholder' => 'http://',
            'formatting'  => 'none',
        ),
    )
);

// Locations
$acf_home_banners->set_location('page', 2);

// Register
register_field_group($acf_home_banners->arguments());