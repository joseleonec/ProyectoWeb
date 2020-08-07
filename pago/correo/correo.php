<?php
	require __DIR__.'\vendor\autoload.php';

	use Spipu\Html2Pdf\Html2Pdf;

	/*Envio de email y adjunto el PDF creado*/
	$msgsuccess = "";
	$msgerror = "";

	if( isset($_POST["btnEnviar"])){
	
		$mailto = $_POST['EmailDestino'];
		$codigoHtml = $_POST['html'];
		$mailfrom = "novel12da@gmail.com";
		$mailsubject = "Factura Terminal";

		$content = '';
		$content .= '
		<style>
		  .clearfix:after {
			content: "";
			display: table;
			clear: both;
		  }
		  
		  a {
			color: #5D6975;
			text-decoration: underline;
		  }
		  
		  body {
			position: relative;
			width: 21cm;
			height: 29.7cm;
			margin: 0 auto;
			color: #001028;
			background: #FFFFFF;
			font-family: Arial, sans-serif;
			font-size: 12px;
			font-family: Arial;
		  }
		  
		  header {
			padding: 10px 0;
			margin-bottom: 30px;
		  }
		  
		  #logo {
			text-align: center;
			margin-bottom: 10px;
		  }
		  
		  #logo img {
			width: 90px;
		  }
		  
		  h1 {
			border-top: 1px solid #5D6975;
			border-bottom: 1px solid #5D6975;
			color: #5D6975;
			font-size: 2.4em;
			line-height: 1.4em;
			font-weight: normal;
			text-align: center;
			margin: 0 0 20px 0;
		  }
		  
		  #project {
			float: left;
		  }
		  
		  #project span {
			color: #5D6975;
			text-align: right;
			width: 52px;
			margin-right: 10px;
			display: inline-block;
			font-size: 0.8em;
		  }
		  
		  #company {
			float: right;
			text-align: right;
		  }
		  
		  #project div, #company div {
			white-space: nowrap;
		  }
		  
		  table {
			width: 100%;
			border-collapse: collapse;
			border-spacing: 0;
			margin-bottom: 20px;
		  }
		  
		  table tr:nth-child(2n-1) td {
			background: #F5F5F5;
		  }
		  
		  table th, table td {
			text-align: center;
		  }
		  
		  table th {
			padding: 5px 20px;
			color: #5D6975;
			border-bottom: 1px solid #C1CED9;
			white-space: nowrap;
			font-weight: normal;
		  }
		  
		  table .service, table .desc {
			text-align: left;
		  }
		  
		  table td {
			padding: 20px;
			text-align: right;
		  }
		  
		  table td.service, table td.desc {
			vertical-align: top;
		  }
		  
		  table td.unit, table td.qty, table td.total {
			font-size: 1.2em;
		  }
		  
		  table td.grand {
			border-top: 1px solid #5D6975;
		  }
		  
		  #notices .notice {
			color: #5D6975;
			font-size: 1.2em;
		  }
		</style>';
	
		/* Tu css */

		$content .= $codigoHtml;

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