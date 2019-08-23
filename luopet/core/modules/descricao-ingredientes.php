<?php

// -----------------------------------------------------------------------------
// Register
// -----------------------------------------------------------------------------
// Modulo
$acf_descricao_ingredientes = new Module('acf_descricao_ingredientes', 'Descrição');

// Fields
$acf_descricao_ingredientes->set_field('textarea', 'Descrição', 'descricao');

// Locations
$acf_descricao_ingredientes->set_location('post_type', 'ingredientes');

// Register
register_field_group($acf_descricao_ingredientes->arguments());