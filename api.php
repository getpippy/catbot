<?php 

$input = $_GET['q']; 
$input = urlencode($input);
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.api.ai/v1/query?v=20150910&query=".$input."&lang=en&sessionId=XXXXXXXXXX&timezone=Asia/Shanghai");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

$headers = array();
$headers[] = "Authorization: Bearer XXXXX";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);

$returnObj = json_decode($result);
$response = $returnObj->result->fulfillment->speech;
$intent = $returnObj->result->metadata->intentName;

$suggestions = array();
foreach($returnObj->result->fulfillment->messages[1]->payload as $s)
{
    array_push($suggestions, $s);
}

$returnObjput = array(
    "intent" => $intent,
    "speech" => $returnObj->result->fulfillment->speech,
    "suggestions" => $suggestions
    );
// Scoring
// if((float)$response = $returnObj->result->score < 0.82)
// {
//     $returnObjput = "";
// }
echo json_encode($returnObjput);
?>