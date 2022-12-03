const puppeteer = require("puppeteer");
const { EmbedBuilder } = require('discord.js');

// Keep Puppeteer open so we don't have to open it each time we get a /streaks
// command
const browserPromise = puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

async function streaks(config, interaction) {
    // Give ourselves some time to reply
    await interaction.deferReply();

    // Wait for the browser to start, in case a command is received before it's
    // even ready
    const browser = await browserPromise;

    let page;
    try {
        // New tab
        page = await browser.newPage();

        const region = interaction.options.get('region').value;
        const summoner = interaction.options.get('summoner-name').value;

        await page.goto(`https://www.op.gg/summoners/${region}/${summoner}`);
        // Either wait for some multi kills elements to appear, or for the page
        // to finish loading. Whichever comes first.
        //
        // If "waitForNetworkIdle" finishes first, it probably means that there
        // is no summer with the provided name.
        await Promise.race([
            page.waitForSelector("div.multi-kill"),
            page.waitForNetworkIdle(),
        ]);

        if (!await page.$("span.summoner-name")) {
            const embeds = new EmbedBuilder()
                .setColor(0xf03405)
                .setTitle("No summoner found")

            await interaction.editReply({ embeds: [embeds] });
            return;
        }

        // Get URL to summoner's avatar.
        const image = await page.evaluate(() => {
            return document.querySelector("div.profile-icon > img").src;
        });

        const multiKills = await page.evaluate(() => {
            const acc = {};
            // Search for multi kills divs in the page and count the number of
            // occurrences for each multi kill kind.
            for (const multiKill of document.querySelectorAll("div.multi-kill")) {
                acc[multiKill.innerText] = (acc[multiKill.innerText] ?? 0) + 1;
            }
            return acc;
        });

        const embeds = new EmbedBuilder()
            .setColor(0xf0bd05)
            .setTitle(summoner)
            .setDescription("Summary of multi kills in recent games")
            .setThumbnail(image)
            .addFields(
                { name: "Double kills", value: (multiKills["Double Kill"] ?? 0).toString() },
                { name: "Triple kills", value: (multiKills["Triple Kill"] ?? 0).toString() },
                { name: "Quadra kills", value: (multiKills["Quadra Kill"] ?? 0).toString() },
                { name: "Penta kills", value: (multiKills["Penta Kill"] ?? 0).toString() },
            )

        await interaction.editReply({ embeds: [embeds] });
    } finally {
        // Always make sure to close the tab, even if an exception occurs.
        await page.close();
    }
}

module.exports = streaks;
