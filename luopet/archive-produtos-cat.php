<?

	$data                = Timber::get_context();
	$data['posts']       = Timber::get_posts();

	Timber::render('archive-produtos.twig', $data);
?>