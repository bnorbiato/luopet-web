<?php

// -----------------------------------------------------------------------------
// Register
// -----------------------------------------------------------------------------
// Modulo
$acf_imagem_destacada = new Module('acf_imagem_destacada', 'Imagem destacada');

// Fields
$acf_imagem_destacada->set_field('image', 'Imagem', 'imagem');

// Locations
$acf_imagem_destacada->set_location('post_type', 'produtos-dog');
$acf_imagem_destacada->set_location('post_type', 'produtos-cat');
$acf_imagem_destacada->set_location('post_type', 'ingredientes');

// Options
$acf_imagem_destacada->set_options(array(
    'position' => 'side'
));

// Register
register_field_group($acf_imagem_destacada->arguments());