<?

	$data                = Timber::get_context();
	$data['post']        = Timber::get_post();

	Timber::render('page-onde-encontrar.twig', $data);
?>