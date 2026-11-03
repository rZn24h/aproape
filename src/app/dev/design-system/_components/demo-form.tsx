"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { CircleCheck } from "lucide-react";

import { contactDemoSchema, type ContactDemoInput, type ContactDemoValues } from "@/lib/validations/contact-demo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mainCategories } from "@/config/categories";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Formular demonstrativ: validare Valibot, fără trimitere către server. */
export function DemoForm() {
  const [submitted, setSubmitted] = React.useState<ContactDemoValues | null>(null);
  const form = useForm<ContactDemoInput, unknown, ContactDemoValues>({
    resolver: valibotResolver(contactDemoSchema),
    defaultValues: { name: "", email: "", sellerType: "persoana", category: "", message: "", terms: false },
    shouldFocusError: true,
  });

  async function onSubmit(values: ContactDemoValues) {
    setSubmitted(null);
    await wait(600); // simulează doar starea de loading; nimic nu este trimis
    setSubmitted(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="grid max-w-xl gap-5" aria-label="Formular demonstrativ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nume</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormDescription>Nu trimitem nimic: formularul este doar demonstrativ.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sellerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tip de cont</FormLabel>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="persoana" id="seller-persoana" />
                    <Label htmlFor="seller-persoana">Persoană fizică</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="firma" id="seller-firma" />
                    <Label htmlFor="seller-firma">Firmă</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorie</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger ref={field.ref} onBlur={field.onBlur}>
                    <SelectValue placeholder="Alege o categorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mainCategories.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mesaj</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} ref={field.ref} />
                </FormControl>
                <FormLabel className="type-secondary">Accept termenii (exemplu)</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" loading={form.formState.isSubmitting}>
            Trimite
          </Button>
          <Button type="button" variant="secondary" onClick={() => form.reset()}>
            Resetează
          </Button>
        </div>
        {submitted ? (
          <Alert variant="success">
            <CircleCheck aria-hidden="true" />
            <AlertTitle>Formular valid</AlertTitle>
            <AlertDescription>Datele au trecut validarea pentru „{submitted.name}”. Nimic nu a fost salvat.</AlertDescription>
          </Alert>
        ) : null}
      </form>
    </Form>
  );
}
