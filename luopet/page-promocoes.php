<?

	$data                = Timber::get_context();
	$data['post']        = Timber::get_post();

	// Get images from instagram by hashtag
	$curl = curl_init();
	curl_setopt_array($curl, [
	    CURLOPT_RETURNTRANSFER => 1,
	    CURLOPT_URL => 'https://www.instagram.com/explore/tags/luopetbrasil/?__a=1',
	]);

	$response = curl_exec($curl);
	curl_close($curl);

	$response = json_decode($response);
	$formatted = $response->graphql->hashtag->edge_hashtag_to_media->edges;

	$images = array();

	foreach ($formatted as $key) {
		$images[] = $key->node->display_url;
	}


	$data['instagram_images'] = array_slice($images, 0, 9);

	Timber::render('page-promocoes.twig', $data);
?>