export function getChatPosition(
	triggerPosition: DOMRect,
	Cwidth:number,
	Cheight:number,
	position?: string,
): { top: string; left: string;
	position?: string, } {
	if (!triggerPosition) {
		return { top: "0px", left: "0px" }; // Return empty string if trigger position is not available
	}

	const { top, left, width, height } = triggerPosition;

	const distance = 5; // Adjust this value to set the desired distance from the trigger
	if(!position) return { top: distance + height+ "px", left: width + "px" };

	switch (position) {
		case "top-left":
			return { top: - distance - Cheight + "px", left: -Cwidth + "px" };
		case "top-center":
			return { top: - distance - Cheight + "px", left: width/2-Cwidth / 2 + "px" };
		case "top-right":
			return { top: - distance - Cheight + "px", left: width+ "px" };
		case "center-left":
			return { top: width/2-Cheight/2 + "px", left: -Cwidth - distance + "px" };
		case "center-right":
			return {
				top: width/2-Cheight/2 + "px",
				left: width + distance + "px",
			};
		case "bottom-right":
			return { top: distance + height+ "px", left: width + "px" };
		case "bottom-center":
			return {
				top: distance + height+ "px",
				left: width/2-Cwidth / 2 + "px",
			};
		case "bottom-left":
			return { top: distance + height+ "px", left: -Cwidth + "px"};
		default:
			return { top: distance + height+ "px", left: width + "px" };	
		}
}

export function getAnimationOrigin(position?:string) {
	if(!position) return "origin-top-left";
	switch (position) {
		case "top-left":
			return 'origin-bottom-right'
		case "top-center":
			return "origin-bottom";
		case "top-right":
			return "origin-bottom-left";
		case "center-left":
			return "origin-center";
		case "center-right":
			return "origin-center";
		case "bottom-right":
			return "origin-top-left";
		case "bottom-center":
			return "origin-top";
		case "bottom-left":
			return "origin-top-right"
		default:
			return "origin-top-left"
		}
}

export function extractMessageFromOutput(output:{type:string, message:any}){
	const {type, message} = output;
	if(type === "text") return message;
	if(type==="object") return message.text;
	return "Unknow message structure"
}


import axios from 'axios';
export async function convertMarkdownToPdf(markdown: string) {
	try {
	  // Extract a clean filename from the first line of the markdown
	  const filename = markdown
		.split('\n')[0]  // Get the first line
		.replace(/^#+\s*/, '')  // Remove leading hashtags and spaces
		.toLowerCase()  // Convert to lowercase
		.replace(/[^a-z0-9]/g, '-')  // Replace non-alphanumeric chars with hyphens
		.replace(/-+/g, '-')  // Replace multiple hyphens with single hyphen
		.replace(/^-|-$/g, '')  // Remove leading/trailing hyphens
		.substring(0, 50) + '.pdf';  // Limit length and add .pdf extension
  
	  const response = await axios.post(
		'https://md-to-pdf.fly.dev',
		`markdown=${encodeURIComponent(`${markdown}`)}`,
		{
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		  },
		  responseType: 'blob'
		}
	  );
  
	  const url = window.URL.createObjectURL(new Blob([response.data]));
	  const link = document.createElement('a');
	  link.href = url;
	  link.download = filename || 'converted.pdf';
	  document.body.appendChild(link);
	  link.click();
  
	  // Clean up
	  document.body.removeChild(link);
	  window.URL.revokeObjectURL(url);
	  return true;
	} catch (error) {
	  console.error('Error converting markdown to PDF:', error);
	  return false;
	}
  }