<?php
	require __DIR__.'\vendor\autoload.php';

	use Spipu\Html2Pdf\Html2Pdf;

	/*Envio de email y adjunto el PDF creado*/
	$msgsuccess = "";
	$msgerror = "";

	if( isset($_POST["btnEnviar"])){
	
		$mailto = $_POST['EmailDestino'];
		$url = $_POST['url'];
		$mailfrom = "novel12da@gmail.com";
		$mailsubject = "Factura Terminal";

		$content = '';
		$content .= '
		<style>
		table {
		border-collapse: collapse;
		}
		table{
		width:100%;
		margin:0 auto;
		}
		td{
		border: 1px solid #e2e2e2;
		padding: 10px; 
		max-width:520px;
		word-wrap: break-word;
		}
		</style>';
		
		$content .= '<table id="das">';
		$content .= '<tr><td>Codigo QR</td> <td><img src="Logo.png" width="120" height="120"></td></tr>';
		$content .= '<tr><td>Email A</td> <td>' . $mailto . '</td> </tr>';
		$content .= '<tr><td>Mail De</td>   <td>' . $mailfrom . '</td> </tr>';
		$content .= '<tr><td id="ds">Asunto Email</td>   <td>' . $mailsubject . '</td> </tr>';
		$content .= '<tr><td>Nombres</td>   <td>' . $firstname . '</td> </tr>';
		$content .= '<tr><td>Apellidos</td>   <td>' . $lastname . '</td> </tr>';
		$content .= '<tr><td>Descripcion</td>   <td>' . $url . '</td> </tr>';
	
		$content .= '</table>';

		require 'PHPMailer/src/PHPMailer.php';
		require 'PHPMailer/src/SMTP.php';
		require 'PHPMailer/src/Exception.php';

		$html2pdf = new HTML2PDF('P', 'A4', 'fr');

		$html2pdf->setDefaultFont('Arial');
		$html2pdf->writeHTML($content, isset($_GET['vuehtml']));

		$html2pdf = new HTML2PDF('P', 'A4', 'fr');
		$html2pdf->WriteHTML($content);

		$to = $mailto;
		$from = $mailfrom;
		$subject = $mailsubject;

		$message = "<p>Consulte el archivo adjunto.</p>";
		$separator = md5(time());
		$eol = PHP_EOL;
		$filename = "pdf-documento.pdf";
		$pdfdoc = $html2pdf->Output('', 'S');
		$attachment = chunk_split(base64_encode($pdfdoc));

		$headers = "From: " . $from . $eol;
		$headers .= "MIME-Version: 1.0" . $eol;
		$headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol . $eol;

		$body = '';
		$body .= "Content-Transfer-Encoding: 7bit" . $eol;
		$body .= "This is a MIME encoded message." . $eol; //had one more .$eol

		$body .= "--" . $separator . $eol;
		$body .= "Content-Type: text/html; charset=\"iso-8859-1\"" . $eol;
		$body .= "Content-Transfer-Encoding: 8bit" . $eol . $eol;
		$body .= $message . $eol;

		$body .= "--" . $separator . $eol;
		$body .= "Content-Type: application/octet-stream; name=\"" . $filename . "\"" . $eol;
		$body .= "Content-Transfer-Encoding: base64" . $eol;
		$body .= "Content-Disposition: attachment" . $eol . $eol;
		$body .= $attachment . $eol;
		$body .= "--" . $separator . "--";

		//----------
		$body = "El codigo QR tendras que presentar al momento de abordar la unidad.";
		//----------
		$mail=new PHPMailer();
		$mail->CharSet = 'UTF-8';

		$mail->IsSMTP();
		$mail->Host       = 'smtp.gmail.com';
		$mail->SMTPSecure = 'tls';
		$mail->Port       = 587;
		$mail->SMTPDebug  = 1;
		$mail->SMTPAuth   = true;
		//$mail->addCustomHeader($headers);//agregado
		$mail->Username   = 'novel12da@gmail.com';
		$mail->Password   = 'sd1230pxyz';
		$mail->SetFrom('novel12da@gmail.com', "Terminal");
		$mail->AddReplyTo('novel12da@gmail.com','Terminal de Cuenca');
		$mail->Subject    = $subject;
		$mail->MsgHTML($body);
		$mail->addStringAttachment($pdfdoc, 'Factura.pdf');
		//$mail->addStringAttachment($pdf, 'file.pdf');
		$mail->AddAddress($to, 'Mi');
		
		if($mail->send()){
			echo 'success';
		}else{
			echo $mail->ErrorInfo;
		}
	};
?>