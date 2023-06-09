class SSLDetails {
    static getConfiguration() {
        const PRIVATE_KEY_FILE = process.env.PRIVATE_KEY_FILE || "./ssl/privatekey.key";
        const CERTIFICATE_FILE = process.env.CERTIFICATE_FILE || "./ssl/certificate.crt";
        const PRIVATE_KEY_PASSPHRASE = process.env.PRIVATE_KEY_PASSPHRASE || "Prestige123$$";

        return {
            PRIVATE_KEY_FILE,
            CERTIFICATE_FILE,
            PRIVATE_KEY_PASSPHRASE
        };
    }
}

export default SSLDetails;