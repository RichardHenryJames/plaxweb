import 'server-only';

/**
 * Business-initiated WhatsApp, through Meta's Cloud API.
 *
 * The constraint that shapes all of this: you cannot send a free-form WhatsApp
 * message to someone who has not messaged you in the last 24 hours. A
 * business-initiated message must use a template that Meta has reviewed and
 * approved in advance, with the variable parts passed as numbered parameters.
 * So the wording lives in Meta's dashboard, not in this file — only the values
 * are sent from here.
 *
 * It is also why the WhatsApp Business *app* on a phone cannot do this. That
 * app has no API. This needs a number registered to the WhatsApp Business
 * Platform, and a number can only live in one of the two.
 *
 * Everything here is optional. With no credentials set, `send` reports that it
 * did nothing and the enquiry proceeds exactly as before — an enquiry that
 * reached the inbox is never worth failing over a message that did not send.
 */

const API_VERSION = 'v21.0';

export type WhatsAppResult = 'sent' | 'skipped' | 'failed';

export function whatsappConfigured(): boolean {
  return Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID && process.env.WHATSAPP_TEMPLATE);
}

/**
 * Template parameters may not contain newlines, tabs, or long runs of spaces —
 * Meta rejects the send outright rather than trimming. Solution names and
 * first names are well behaved, but they arrive from a form, so they are
 * cleaned rather than trusted.
 */
function param(text: string): { type: 'text'; text: string } {
  return { type: 'text', text: text.replace(/\s+/g, ' ').trim().slice(0, 120) || '—' };
}

export async function sendWhatsAppTemplate(toE164: string, values: string[]): Promise<WhatsAppResult> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const template = process.env.WHATSAPP_TEMPLATE;
  const lang = process.env.WHATSAPP_TEMPLATE_LANG ?? 'en';

  if (!token || !phoneId || !template) return 'skipped';

  const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      // The API wants digits only; a leading plus is rejected.
      to: toE164.replace(/[^0-9]/g, ''),
      type: 'template',
      template: {
        name: template,
        language: { code: lang },
        components: values.length ? [{ type: 'body', parameters: values.map(param) }] : [],
      },
    }),
  });

  if (!res.ok) {
    // Meta's errors are specific and worth keeping whole: a rejected template,
    // an unverified number and an expired token all look identical otherwise.
    console.error(`[plaxweb:whatsapp] ${res.status}: ${await res.text()}`);
    return 'failed';
  }

  return 'sent';
}
