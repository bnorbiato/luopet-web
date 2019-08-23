<?php

// -----------------------------------------------------------------------------
//  API Key Google Maps
// -----------------------------------------------------------------------------
$api_maps = '';


// -----------------------------------------------------------------------------
// Includes 
// -----------------------------------------------------------------------------
include_once "core/helpers.php";
include_once "core/functions-modules.php";
include_once "core/functions-cpt.php";
include_once "core/functions-taxonomy.php";
include_once "core/functions-contact-form-front-end.php";
include_once "core/functions-contact-form.php";

// Admin
include_once "core/functions-admin.php";
include_once "functions-ajax.php";


// -----------------------------------------------------------------------------
// Incluo algumas informações no contexto do Timber
// -----------------------------------------------------------------------------
function add_to_context($data) {

    // Páginas
	$data['home']         = Timber::get_post(2);
	$data['ingredientes'] = Timber::get_posts('post_type=ingredientes&posts_per_page=-1&orderby=date&order=asc');
	$data['categorias']   = Timber::get_terms();

    // Formulários
    global $cat_menu, $dog_menu, $fale_conosco, $onde_encontrar;
    $data['cat_menu'] = $cat_menu->render();
    $data['dog_menu'] = $dog_menu->render();
    $data['fale_conosco'] = $fale_conosco->render();
    $data['onde_encontrar'] = $onde_encontrar->render();



    // Return
    return $data;
}
add_filter('timber_context', 'add_to_context');


// -----------------------------------------------------------------------------
// Forms
// -----------------------------------------------------------------------------
$email = get_field('email_formulario', 'option');

// Forms Cat Menu
$cat_menu = new Contact_Form( 'cat_menu', $email );
$cat_menu->set_class_form( 'Row _gutters' );

// Fields
$cat_menu->set_field( 
	'email', 
	'email', 
	'E-mail', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'E-mail',
			'class_col'	=> '_col-8',
		)
	)
);

// Button
$cat_menu->set_button( 'submit', 'Enviar', 'Button');

// Informacoes para envio
$cat_menu->set_subject( 'Newsletter - Cat Menu' );
$cat_menu->set_reply_to( 'email' );

// Forms Fale Conosco
$fale_conosco = new Contact_Form( 'fale_conosco', $email );

// Fields
// Fields
$fale_conosco->set_field( 
	'text', 
	'nome', 
	'Nome', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'Nome'
		)
	)
);
$fale_conosco->set_field( 
	'email', 
	'email', 
	'E-mail', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'E-mail'
		)
	)
);
$fale_conosco->set_field( 
	'text', 
	'telefone', 
	'Telefone', 
	false, 
	array(
		'attributes' => array(
			'placeholder' => 'Telefone*',
			'class'       => 'telefone',
		)
	)
);
$fale_conosco->set_field( 
	'text', 
	'cidade', 
	'Cidade', 
	false, 
	array(
		'attributes' => array(
			'placeholder' => 'Cidade*'
		)
	)
);
$fale_conosco->set_field( 'checkbox', 'assunto', 'Quero ser um revendedor Luopet', true,
	array(
		'options' => array(
			'1' => 'Quero ser um revendedor Luopet'
		), 
	)
);
$fale_conosco->set_field( 
	'textarea', 
	'mensagem', 
	'Mensagem', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'Mensagem',
		)
	)
);
// Button
$fale_conosco->set_button( 'submit', 'Enviar', 'Button');

// Informacoes para envio
$fale_conosco->set_subject( 'Fale Conosco - Luopet' );
$fale_conosco->set_reply_to( 'email' );


// Forms Dog Menu
$dog_menu = new Contact_Form( 'dog_menu', $email );
$dog_menu->set_class_form( 'Row _gutters' );

// Fields
$dog_menu->set_field( 
	'email', 
	'email', 
	'E-mail', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'E-mail',
			'class_col'	=> '_col-8',
		)
	)
);

// Button
$dog_menu->set_button( 'submit', 'Enviar', 'Button');

// Informacoes para envio
$dog_menu->set_subject( 'Newsletter - Dog Menu' );
$dog_menu->set_reply_to( 'email' );

// Forms Onde Encontrar
$onde_encontrar = new Contact_Form( 'onde_encontrar', $email );
$onde_encontrar->set_class_form( 'Row _gutters' );

// Fields
// Fields
$onde_encontrar->set_field( 
	'text', 
	'nome', 
	'Nome', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'Nome'
		)
	)
);
$onde_encontrar->set_field( 
	'email', 
	'email', 
	'E-mail', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'E-mail'
		)
	)
);
$onde_encontrar->set_field( 'select', 'uf', 'Estado', true,
	array(
		'options' => array(
			''   => 'Estado',
			'AC' => 'Acre',
			'AL' => 'Alagoas',
			'AP' => 'Amapá',
			'AM' => 'Amazonas',
			'BA' => 'Bahia',
			'CE' => 'Ceará',
			'DF' => 'Distrito Federal',
			'ES' => 'Espírito Santo',
			'GO' => 'Goiás',
			'MA' => 'Maranhão',
			'MT' => 'Mato Grosso',
			'MS' => 'Mato Grosso do Sul',
			'MG' => 'Minas Gerais',
			'PA' => 'Pará',
			'PB' => 'Paraíba',
			'PR' => 'Paraná',
			'PE' => 'Pernambuco',
			'PI' => 'Piauí',
			'RJ' => 'Rio de Janeiro',
			'RN' => 'Rio Grande do Norte',
			'RS' => 'Rio Grande do Sul',
			'RO' => 'Rondônia',
			'RR' => 'Roraima',
			'SC' => 'Santa Catarina',
			'SP' => 'São Paulo',
			'SE' => 'Sergipe',
			'TO' => 'Tocantins',
		), 
	)
);
$onde_encontrar->set_field( 'select', 'cidade', 'Cidade', true,
	array(
		'options' => array(
			''   => 'Cidade',
		), 
	)
);
$onde_encontrar->set_field( 
	'text', 
	'rua', 
	'Rua', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'Rua',
			'class_col'	=> '_col-9',
		)
	)
);
$onde_encontrar->set_field( 
	'text', 
	'numero', 
	'Numero', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'Número',
			'class_col'	=> '_col-3',
		)
	)
);
$onde_encontrar->set_field( 
	'text', 
	'bairro', 
	'Bairro', 
	true, 
	array(
		'attributes' => array(
			'placeholder' => 'Bairro',
		)
	)
);
// Button
$onde_encontrar->set_button( 'submit', 'Enviar', 'Button');

// Informacoes para envio
$onde_encontrar->set_subject( 'Onde encontrar - Luopet' );
$onde_encontrar->set_reply_to( 'email' );

// -----------------------------------------------------------------------------
// CPTs
// -----------------------------------------------------------------------------
$dog = new Custom_Post_Type('Dog Menu', 'Produto', 'produtos-dog');
$cat = new Custom_Post_Type('Cat Menu', 'Produto', 'produtos-cat');
$ingredientes = new Custom_Post_Type('Ingredientes', 'Ingrediente', 'ingredientes');

// -----------------------------------------------------------------------------
// Taxonomy
// -----------------------------------------------------------------------------
$taxonomy = new Taxonomy('Categorias', 'Categoria', 'categorias-dog', 'produtos-dog');
$taxonomy = new Taxonomy('Categorias', 'Categoria', 'categorias-cat', 'produtos-cat');