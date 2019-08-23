<?

	$data          = Timber::get_context();
	$data['post']  = Timber::get_post();
	$args = array(
		'post_type'  => array('produtos-cat','produtos-dog'),
		'meta_query' => array(
			array(
				'key'     => 'ingredientes',
				'value'   => '"' .$post->ID. '"',
				'compare' => 'like',
			),
		),
	);
	$query = new WP_Query( $args );
	$data['posts'] = Timber::get_posts($query);

	Timber::render('single-ingredientes.twig', $data);
?>